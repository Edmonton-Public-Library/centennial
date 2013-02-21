"""
Modified from:
https://gist.github.com/jrosebr1/2140738/raw/b92151bc2b10dbd6bfa656eb2e6c47a53c1b5b52/validators.py
"""
import magic
from os.path import splitext

from django.core.exceptions import ValidationError
from django.template.defaultfilters import filesizeformat

class FileValidator(object):
    """
    Validator for files, checking the size, extension and mimetype.

    Initialization parameters:
        allowed_extensions: iterable with allowed file extensions
            ie. ('txt', 'doc')
        allowd_mimetypes: iterable with allowed mimetypes
            ie. ('image/png', )
        min_size: minimum number of bytes allowed
            ie. 100
        max_size: maximum number of bytes allowed
            ie. 24*1024*1024 for 24 MB

    Usage example::

        MyModel(models.Model):
            myfile = FileField(validators=FileValidator(max_size=24*1024*1024), ...)

    """

    extension_message = "Extension '%(extension)s' not allowed. Allowed extensions are: '%(allowed_extensions)s.'"
    mime_message = "MIME type '%(mimetype)s' is not valid. Allowed types are: %(allowed_mimetypes)s."
    min_size_message = 'The current file %(size)s, which is too small. The minumum file size is %(allowed_size)s.'
    max_size_message = 'The current file %(size)s, which is too large. The maximum file size is %(allowed_size)s.'

    def __init__(self, *args, **kwargs):
        self.allowed_extensions = kwargs.pop('allowed_extensions', None)
        self.allowed_mimetypes = kwargs.pop('allowed_mimetypes', None)
        self.min_size = kwargs.pop('min_size', 0)
        self.max_size = kwargs.pop('max_size', None)

    def __call__(self, value):
        """
        Check the extension, content type and file size.
        """
        self.check_file_extension(value)
        self.check_file_mime_type(value)
        self.check_file_size(value)

    def check_file_extension(self, value):
        ext = splitext(value.name)[1][1:].lower()
        if self.allowed_extensions and ext not in self.allowed_extensions:
            message = self.extension_message % {
                'extension' : ext,
                'allowed_extensions': ', '.join(self.allowed_extensions)
            }
            raise ValidationError(message)

    def check_file_mime_type(self, value):
        mime = magic.Magic(mime=True)
        mimetype = mime.from_file(value.file.temporary_file_path())
        if self.allowed_mimetypes and mimetype not in self.allowed_mimetypes:
            message = self.mime_message % {
                'mimetype': mimetype,
                'allowed_mimetypes': ', '.join(self.allowed_mimetypes)
            }
            raise ValidationError(message)

    def check_file_size(self, value):
        filesize = len(value)
        if self.max_size and filesize > self.max_size:
            message = self.max_size_message % {
                'size': filesizeformat(filesize),
                'allowed_size': filesizeformat(self.max_size)
            }
            raise ValidationError(message)

        elif filesize < self.min_size:
            message = self.min_size_message % {
                'size': filesizeformat(filesize),
                'allowed_size': filesizeformat(self.min_size)
            }
            raise ValidationError(message)
