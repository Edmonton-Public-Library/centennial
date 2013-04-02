# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Branch.floor_plan'
        db.alter_column('timemap_branch', 'floor_plan', self.gf('django.db.models.fields.files.FileField')(default='', max_length=100))

    def backwards(self, orm):

        # Changing field 'Branch.floor_plan'
        db.alter_column('timemap_branch', 'floor_plan', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True))

    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
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
            'btype': ('django.db.models.fields.CharField', [], {'default': "'B'", 'max_length': '1', 'db_index': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '200'}),
            'end_year': ('epl.custommodels.IntegerRangeField', [], {'db_index': 'True', 'max_value': '3000', 'min_value': '1900', 'null': 'True', 'blank': 'True'}),
            'floor_plan': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '90', 'min_value': '-90'}),
            'longitude': ('epl.custommodels.FloatRangeField', [], {'max_value': '180', 'min_value': '-180'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100', 'db_index': 'True'}),
            'start_year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900', 'db_index': 'True'})
        },
        'timemap.featuredstory': {
            'Meta': {'object_name': 'FeaturedStory'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'story': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timemap.Story']"})
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
            'anonymous': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'branch': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timemap.Branch']", 'null': 'True', 'blank': 'True'}),
            'content_type': ('django.db.models.fields.CharField', [], {'default': "'T'", 'max_length': '1', 'db_index': 'True'}),
            'day': ('epl.custommodels.IntegerRangeField', [], {'max_value': '31', 'min_value': '1', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '40', 'db_index': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'link_url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True'}),
            'media_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True'}),
            'month': ('epl.custommodels.IntegerRangeField', [], {'max_value': '12', 'min_value': '1', 'null': 'True', 'blank': 'True'}),
            'public_approved': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'story_text': ('django.db.models.fields.TextField', [], {'max_length': '500', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '100', 'db_index': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"}),
            'year': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3000', 'min_value': '1900', 'db_index': 'True'})
        }
    }

    complete_apps = ['timemap']