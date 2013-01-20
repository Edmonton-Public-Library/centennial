# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Branch'
        db.create_table('timemap_branch', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('start_year', self.gf('epl.custommodels.IntegerRangeField')(max_value=3000, min_value=1900)),
            ('end_year', self.gf('epl.custommodels.IntegerRangeField')(max_value=3000, min_value=1900)),
            ('latitude', self.gf('epl.custommodels.FloatRangeField')(max_value=90, min_value=-90)),
            ('longitude', self.gf('epl.custommodels.FloatRangeField')(max_value=180, min_value=-180)),
        ))
        db.send_create_signal('timemap', ['Branch'])


    def backwards(self, orm):
        # Deleting model 'Branch'
        db.delete_table('timemap_branch')


    models = {
        'timemap.branch': {
            'Meta': {'object_name': 'Branch'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'end_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '90', 'min_value': '-90'}),
            'longitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '180', 'min_value': '-180'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'start_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'})
        }
    }

    complete_apps = ['timemap']