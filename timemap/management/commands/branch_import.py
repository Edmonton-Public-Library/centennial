import csv
from optparse import make_option

from django.core.management.base import BaseCommand
from timemap.models import Branch
from django.core.files import File

class Command(BaseCommand):
    option_list = BaseCommand.option_list + (
            make_option("-f",
                        "--file",
                        dest="filename",
                        help="CSV file",
                        metavar="FILE"),
            make_option("-s",
                        "--source",
                        dest="source",
                        help="Source dir for the floorplan images",
                        metavar="SOURCE"),
            )
    help = 'Imports the given csv file of branch data'

    def handle(self, *args, **options):
        csv_path = options["filename"]
        image_folder = options["source"]
        with open(csv_path, 'rb') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='"')
            for index, entry in enumerate(reader):
                if index < 3:
                    continue
                self.add_to_db(entry, image_folder)

    def add_to_db(self, entry, image_folder):
        new_branch = Branch()
        new_branch.name = entry[0]
        new_branch.start_year = entry[1]
        if entry[2] != "Current":
            new_branch.end_year = entry[2]
        if entry[3] and entry[3][-4:] != ".pdf":
            try:
                new_branch.floor_plan = File(open(image_folder + "/" +  entry[3]))
            except IOError:
                self.stderr.write("Image %s not found for branch  %s.\n" %
                                 (entry[3], new_branch.name))
                return
        else:
            if entry[3] and entry[3][-4:] == ".pdf":
                self.stderr.write("PDF floorplan for  %s.\n" % new_branch.name)
                return
            else:
                self.stderr.write("No floor plan specified for %s. Skipping\n" % new_branch.name)
                return
        new_branch.longitude = entry[4]
        new_branch.latitude = entry[5]
        if entry[6]:
            new_branch.description = entry[6]
        else:
            self.stderr.write("No description for %s" % new_branch.name)
            return
        new_branch.save()
