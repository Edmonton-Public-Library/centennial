# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Task.description'
        db.delete_column('hyquest_task', 'description')


        # Changing field 'Task.type'
        db.alter_column('hyquest_task', 'type', self.gf('epl.custommodels.IntegerRangeField')(max_value=3, min_value=0))
        # Adding index on 'TaskCode', fields ['code']
        db.create_index('hyquest_taskcode', ['code'])

        # Adding unique constraint on 'UserQuestAction', fields ['quest', 'user']
        db.create_unique('hyquest_userquestaction', ['quest_id', 'user_id'])

        # Adding unique constraint on 'UserQuestSetAction', fields ['user', 'questset']
        db.create_unique('hyquest_userquestsetaction', ['user_id', 'questset_id'])

        # Adding unique constraint on 'UserTaskAction', fields ['task', 'user']
        db.create_unique('hyquest_usertaskaction', ['task_id', 'user_id'])


    def backwards(self, orm):
        # Removing unique constraint on 'UserTaskAction', fields ['task', 'user']
        db.delete_unique('hyquest_usertaskaction', ['task_id', 'user_id'])

        # Removing unique constraint on 'UserQuestSetAction', fields ['user', 'questset']
        db.delete_unique('hyquest_userquestsetaction', ['user_id', 'questset_id'])

        # Removing unique constraint on 'UserQuestAction', fields ['quest', 'user']
        db.delete_unique('hyquest_userquestaction', ['quest_id', 'user_id'])

        # Removing index on 'TaskCode', fields ['code']
        db.delete_index('hyquest_taskcode', ['code'])


        # User chose to not deal with backwards NULL issues for 'Task.description'
        raise RuntimeError("Cannot reverse this migration. 'Task.description' and its values cannot be restored.")

        # Changing field 'Task.type'
        db.alter_column('hyquest_task', 'type', self.gf('epl.custommodels.IntegerRangeField')(max_value=4, min_value=0))

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
        'hyquest.quest': {
            'Meta': {'object_name': 'Quest'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'points': ('epl.custommodels.IntegerRangeField', [], {'max_value': '6000', 'min_value': '0'}),
            'quest_set': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.QuestSet']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'hyquest.questset': {
            'Meta': {'object_name': 'QuestSet'},
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '600'}),
            'featured': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'points': ('epl.custommodels.IntegerRangeField', [], {'max_value': '6000', 'min_value': '0'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'hyquest.task': {
            'Meta': {'object_name': 'Task'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'points': ('epl.custommodels.IntegerRangeField', [], {'max_value': '6000', 'min_value': '0'}),
            'quest': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Quest']"}),
            'taskinfo': ('django.db.models.fields.CharField', [], {'max_length': '400'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'type': ('epl.custommodels.IntegerRangeField', [], {'max_value': '3', 'min_value': '0'})
        },
        'hyquest.taskcode': {
            'Meta': {'object_name': 'TaskCode'},
            'code': ('django.db.models.fields.CharField', [], {'max_length': '20', 'db_index': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'task': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Task']"}),
            'uses_remaining': ('django.db.models.fields.IntegerField', [], {'default': '1'})
        },
        'hyquest.userquestaction': {
            'Meta': {'unique_together': "(('user', 'quest'),)", 'object_name': 'UserQuestAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'quest': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Quest']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'hyquest.userquestsetaction': {
            'Meta': {'unique_together': "(('user', 'questset'),)", 'object_name': 'UserQuestSetAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'questset': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.QuestSet']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'hyquest.usertaskaction': {
            'Meta': {'unique_together': "(('user', 'task'),)", 'object_name': 'UserTaskAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'task': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Task']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['hyquest']