# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'UserAction'
        db.delete_table('hyquest_useraction')

        # Adding model 'UserQuestAction'
        db.create_table('hyquest_userquestaction', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('quest', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['hyquest.Quest'])),
            ('complete', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('beginTime', self.gf('django.db.models.fields.DateField')()),
            ('completionTime', self.gf('django.db.models.fields.DateField')(null=True)),
        ))
        db.send_create_signal('hyquest', ['UserQuestAction'])

        # Adding model 'UserQuestSetAction'
        db.create_table('hyquest_userquestsetaction', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('questset', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['hyquest.QuestSet'])),
            ('complete', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('beginTime', self.gf('django.db.models.fields.DateField')()),
            ('completionTime', self.gf('django.db.models.fields.DateField')(null=True)),
        ))
        db.send_create_signal('hyquest', ['UserQuestSetAction'])

        # Adding model 'UserTaskAction'
        db.create_table('hyquest_usertaskaction', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('task', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['hyquest.Task'])),
            ('complete', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('beginTime', self.gf('django.db.models.fields.DateField')()),
            ('completionTime', self.gf('django.db.models.fields.DateField')(null=True)),
        ))
        db.send_create_signal('hyquest', ['UserTaskAction'])


    def backwards(self, orm):
        # Adding model 'UserAction'
        db.create_table('hyquest_useraction', (
            ('task', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['hyquest.Task'])),
            ('complete', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('completionTime', self.gf('django.db.models.fields.DateField')(null=True)),
            ('beginTime', self.gf('django.db.models.fields.DateField')()),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
        ))
        db.send_create_signal('hyquest', ['UserAction'])

        # Deleting model 'UserQuestAction'
        db.delete_table('hyquest_userquestaction')

        # Deleting model 'UserQuestSetAction'
        db.delete_table('hyquest_userquestsetaction')

        # Deleting model 'UserTaskAction'
        db.delete_table('hyquest_usertaskaction')


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
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'points': ('epl.custommodels.IntegerRangeField', [], {'max_value': '6000', 'min_value': '0'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'hyquest.task': {
            'Meta': {'object_name': 'Task'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '400'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'points': ('epl.custommodels.IntegerRangeField', [], {'max_value': '6000', 'min_value': '0'}),
            'quest': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Quest']"}),
            'taskinfo': ('django.db.models.fields.CharField', [], {'max_length': '400'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'type': ('epl.custommodels.IntegerRangeField', [], {'max_value': '4', 'min_value': '0'})
        },
        'hyquest.taskcode': {
            'Meta': {'object_name': 'TaskCode'},
            'code': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'task': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Task']"}),
            'uses_remaining': ('django.db.models.fields.IntegerField', [], {'default': '1'})
        },
        'hyquest.userquestaction': {
            'Meta': {'object_name': 'UserQuestAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'quest': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Quest']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'hyquest.userquestsetaction': {
            'Meta': {'object_name': 'UserQuestSetAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'questset': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.QuestSet']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'hyquest.usertaskaction': {
            'Meta': {'object_name': 'UserTaskAction'},
            'beginTime': ('django.db.models.fields.DateField', [], {}),
            'complete': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'completionTime': ('django.db.models.fields.DateField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'task': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['hyquest.Task']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['hyquest']