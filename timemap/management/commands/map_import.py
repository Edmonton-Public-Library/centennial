import csv
from optparse import make_option

from django.core.management.base import BaseCommand
from timemap.models import Map

class Command(BaseCommand):
    option_list = BaseCommand.option_list + (
            make_option("-f",
                        "--file",
                        dest="filename",
                        help="CSV file",
                        metavar="FILE"),
            )
    help = 'Imports the given csv file of map data'

    def handle(self, *args, **options):
        csv_path = options["filename"]
        with open(csv_path, 'rb') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='"')
            for index, entry in enumerate(reader):
                if index < 3:
                    continue
                self.add_to_db(entry)

    def add_to_db(self, entry):
        new_map = Map()
        new_map.base_folder = '/static/maps/' + entry[0][:4] + '/'
        new_map.title = entry[1]
        new_map.author = entry[2]
        new_map.published = entry[3]
        new_map.start_year = entry[4]
        new_map.end_year = entry[5]
        new_map.save()
        self.stdout.write("Created %s\n" % (new_map.title))
