"""Automated migration

Revision ID: 0ee53c421bc4
Revises: b4309743f62b
Create Date: 2025-03-08 10:16:46.703855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ee53c421bc4'
down_revision = 'b4309743f62b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.drop_constraint('destinations_country_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.create_unique_constraint('destinations_country_key', ['country'])

    # ### end Alembic commands ###
