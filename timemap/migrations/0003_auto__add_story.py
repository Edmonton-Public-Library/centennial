# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Story'
        db.create_table('timemap_story', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=40)),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=40, blank=True)),
            ('story_text', self.gf('django.db.models.fields.TextField')(max_length=500, blank=True)),
            ('link_url', self.gf('django.db.models.fields.URLField')(max_length=200, blank=True)),
            ('year', self.gf('epl.custommodels.IntegerRangeField')(max_value=3000, min_value=1900)),
            ('month', self.gf('epl.custommodels.IntegerRangeField')(max_value=12, min_value=0)),
            ('day', self.gf('epl.custommodels.IntegerRangeField')(max_value=31, min_value=0)),
            ('branch', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timemap.Branch'])),
            ('public_approved', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal('timemap', ['Story'])


    def backwards(self, orm):
        # Deleting model 'Story'
        db.delete_table('timemap_story')


    models = {
        'timemap.branch': {
            'Meta': {'object_name': 'Branch'},
            'description': ('django.db.models.fields.TextField', [], {'max_length': '200'}),
            'end_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '90', 'min_value': '-90'}),
            'longitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '180', 'min_value': '-180'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'start_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'})
        },
        'timemap.story': {
            'Meta': {'object_name': 'Story'},
            'branch': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timemap.Branch']"}),
            'day': ('epl.custommodels.IntegerRangeField', [], {'max_value': '31', 'min_value': '0'}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '40', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'link_url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True'}),
            'month': ('epl.custommodels.IntegerRangeField', [], {'max_value': '12', 'min_value': '0'}),
            'public_approved': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'story_text': ('django.db.models.fields.TextField', [], {'max_length': '500', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '40'}),
            'year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'})
        }
    }

    complete_apps = ['timemap']