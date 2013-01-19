# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Branch.start_year'
        db.alter_column('timemap_branch', 'start_year', self.gf('epl.custommodels.IntegerRangeField')(max_value=3000, min_value=1900))

        # Changing field 'Branch.end_year'
        db.alter_column('timemap_branch', 'end_year', self.gf('epl.custommodels.IntegerRangeField')(max_value=3000, min_value=1900))

        # Changing field 'Branch.longitude'
        db.alter_column('timemap_branch', 'longitude', self.gf('epl.custommodels.FloatRangeField')(max_value=180, min_value=-180))

        # Changing field 'Branch.latitude'
        db.alter_column('timemap_branch', 'latitude', self.gf('epl.custommodels.FloatRangeField')(max_value=90, min_value=-90))

    def backwards(self, orm):

        # Changing field 'Branch.start_year'
        db.alter_column('timemap_branch', 'start_year', self.gf('django.db.models.fields.IntegerField')())

        # Changing field 'Branch.end_year'
        db.alter_column('timemap_branch', 'end_year', self.gf('django.db.models.fields.IntegerField')())

        # Changing field 'Branch.longitude'
        db.alter_column('timemap_branch', 'longitude', self.gf('django.db.models.fields.FloatField')())

        # Changing field 'Branch.latitude'
        db.alter_column('timemap_branch', 'latitude', self.gf('django.db.models.fields.FloatField')())

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