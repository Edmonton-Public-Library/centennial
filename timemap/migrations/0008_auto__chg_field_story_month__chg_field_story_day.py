# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Story.month'
        db.alter_column('timemap_story', 'month', self.gf('epl.custommodels.IntegerRangeField')(max_value=12, min_value=0, null=True))

        # Changing field 'Story.day'
        db.alter_column('timemap_story', 'day', self.gf('epl.custommodels.IntegerRangeField')(max_value=31, min_value=0, null=True))

    def backwards(self, orm):

        # User chose to not deal with backwards NULL issues for 'Story.month'
        raise RuntimeError("Cannot reverse this migration. 'Story.month' and its values cannot be restored.")

        # User chose to not deal with backwards NULL issues for 'Story.day'
        raise RuntimeError("Cannot reverse this migration. 'Story.day' and its values cannot be restored.")

    models = {
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'taggit.tag': {
            'Meta': {'object_name': 'Tag'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'slug': ('django.db.models.fields.SlugField', [], {'unique': 'True', 'max_length': '100'})
        },
        'taggit.taggeditem': {
            'Meta': {'object_name': 'TaggedItem'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'taggit_taggeditem_tagged_items'", 'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'object_id': ('django.db.models.fields.IntegerField', [], {'db_index': 'True'}),
            'tag': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'taggit_taggeditem_items'", 'to': "orm['taggit.Tag']"})
        },
        'timemap.branch': {
            'Meta': {'object_name': 'Branch'},
            'description': ('django.db.models.fields.TextField', [], {'max_length': '200'}),
            'end_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900', 'null': 'True', 'blank': 'True'}),
            'floor_plan': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '90', 'min_value': '-90'}),
            'longitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '180', 'min_value': '-180'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'start_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'})
        },
        'timemap.map': {
            'Meta': {'object_name': 'Map'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'base_folder': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'end_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'published': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'}),
            'start_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'timemap.story': {
            'Meta': {'object_name': 'Story'},
            'branch': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timemap.Branch']"}),
            'day': ('epl.custommodels.IntegerRangeField', [], {'max_value': '31', 'min_value': '0', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '40', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'link_url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True'}),
            'media_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True'}),
            'month': ('epl.custommodels.IntegerRangeField', [], {'max_value': '12', 'min_value': '0', 'null': 'True', 'blank': 'True'}),
            'public_approved': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'story_text': ('django.db.models.fields.TextField', [], {'max_length': '500', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '40'}),
            'year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900'})
        }
    }

    complete_apps = ['timemap']