from setuptools import setup

exec (open('dash_components_material/version.py').read())

setup(
    name='dash_components_material',
    version=__version__,
    author='ssword',
    packages=['dash_components_material'],
    include_package_data=True,
    license='MIT',
    description='Dash components with material-ui theme.',
    install_requires=[]
)
