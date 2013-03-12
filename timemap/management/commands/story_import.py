import csv
from optparse import make_option

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from timemap.models import Story, Branch
from django.core.files import File
from django.core.exceptions import ObjectDoesNotExist

CONTENT_TYPE = {"text" : "T",
                 "link": "L",
                 "image": "I",
                 "pdf": "P",
                 "audio": "A",
                 "video": "V",
                }

DEFAULT_C = '\033[0;0m'
GREEN_C = '\033[01;32m'
RED_C = '\033[01;31m'

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
                        help="Source dir media files",
                        metavar="SOURCE"),
            )
    help = 'Imports the given csv file of story data'

    def handle(self, *args, **options):
        csv_path = options["filename"]
        media_folder = options["source"]
        with open(csv_path, 'rU') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='"')
            for entry in reader:
                self.add_to_db(entry, media_folder)

    def add_to_db(self, entry, media_folder):
        new_story = Story()
        if (entry[6].lower) in ['audio', 'video', 'image', 'pdf']:
            try:
                new_story.media_file = File(open(media_folder + "/" + entry[0]))
            except IOError:
                self.stderr.write(RED_C + "Media %s not found for story  %s." % (entry[0], entry[1]) + \
                        DEFAULT_C + "\n" )
                return
        else:
            if entry[6].lower() == "link":
                new_story.link_url = entry[0]
        new_story.title = entry[1]
        new_story.year = entry[2]
        try:
            new_story.branch = Branch.objects.get(name=entry[3])
        except ObjectDoesNotExist:
            self.stderr.write(RED_C + "Branch %s not found for story  %s." %
                             (entry[3], new_story.title) + DEFAULT_C + "\n")
            return

        new_story.user = User.objects.get(pk=1)
        new_story.content_type = CONTENT_TYPE[entry[6].lower()]

        new_story.description = entry[7]
        new_story.public_approved = True
        print new_story
        new_story.save()
        for keyword in entry[5].split(','):
            new_story.keywords.add(keyword)
