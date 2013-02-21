from tastypie.validation import Validation

def validate_text(bundle):
    errors = {}
    if bundle.data.get('link_url', ""):
        errors['link_url'] = "Story 'content_type' set as text, but 'link_url' was provided"
    if bundle.data.get('media_file', ""):
        errors['media_file'] = "Story 'content_type' set as text, but 'media_file' was provided"
    if not bundle.data.get('story_text', ""):
        errors['story_text'] = "Story 'content_type' set as text, but 'story_text' was not provided"
    return errors

def validate_link(bundle):
    errors = {}
    if not bundle.data.get('link_url', ""):
        errors['link_url'] = "Story 'content_type' set as link, but 'link_url' was not provided"
    if bundle.data.get('media_file', ""):
        errors['media_file'] = "Story 'content_type' set as link, but 'media_file' was provided"
    if bundle.data.get('story_text', ""):
        errors['story_text'] = "Story 'content_type' set as link, but 'story_text' was provided"
    return errors

def validate_media(bundle):
    errors = {}
    if bundle.data.get('link_url', ""):
        errors['link_url'] = "Story 'content_type' set as media, but 'link_url' was provided"
    if bundle.data.get('media_file', ""):
        errors['media_file'] = "Story 'content_type' set as media, but 'media_file' upload should be done seperatly"
    if bundle.data.get('story_text', ""):
        errors['story_text'] = "Story 'content_type' set as media, but 'story_text' was provided"
    return errors

class StoryValidation(Validation):
    """
    Checks only one of the story fields (story_text, link, media_file) is defined
    """
    content_types = {"text": validate_text,
                     "link": validate_link,
                     "media": validate_media,
                    }

    def is_valid(self, bundle, request=None):
        errors = {}
        if not bundle.data.get('content_type', ""):
            return {'content_type': "Must declare a 'content_type' for the story"}

        errors.update(self.content_types[bundle.data['content_type']](bundle))
        return errors

