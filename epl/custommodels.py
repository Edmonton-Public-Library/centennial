from django.db import models
from south.modelsinspector import add_introspection_rules

class IntegerRangeField(models.IntegerField):
    """ Model for restricting integer field range
        http://stackoverflow.com/questions/849142/how-to-limit-the-maximum-value-of-a-numeric-field-in-a-django-model
    """

    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

add_introspection_rules([
    ([IntegerRangeField],[],
      {"min_value": ["min_value", {}],
       "max_value": ["max_value", {}],
      },
    ),
], ["^epl\.custommodels\.IntegerRangeField"])

class FloatRangeField(models.FloatField):
    """ Model for restricting float field range
    """

    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.FloatField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(FloatRangeField, self).formfield(**defaults)

add_introspection_rules([
    ([FloatRangeField],[],
      {"min_value": ["min_value", {}],
       "max_value": ["max_value", {}],
      },
    ),
], ["^epl\.custommodels\.FloatRangeField"])
