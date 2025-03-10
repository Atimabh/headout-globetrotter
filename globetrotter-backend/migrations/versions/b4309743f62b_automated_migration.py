"""Automated migration

Revision ID: b4309743f62b
Revises: e6b33e4047d8
Create Date: 2025-03-08 10:12:32.921916

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b4309743f62b'
down_revision = 'e6b33e4047d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('city', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('country', sa.String(length=100), nullable=False))
        batch_op.drop_constraint('destinations_name_key', type_='unique')
        batch_op.create_unique_constraint(None, ['country'])
        batch_op.create_unique_constraint(None, ['city'])
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('destinations_name_key', ['name'])
        batch_op.drop_column('country')
        batch_op.drop_column('city')

    # ### end Alembic commands ###
