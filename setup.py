from setuptools import find_packages, setup
import os
with open(os.path.abspath(os.path.join(__file__, '../README.rst')), encoding='utf-8') as f:
    long_description = f.read()
setup(
    name='columbo-records',
    version='0.0.1',
    author='CMU LTI MLSP',
    url='https://github.com/bstriner/aws-concat',
    install_requires=[
        'aws-sagemaker-remote',
        'aws-sam-cli'
    ],
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'aws-concat=aws_concat.main:main'
        ]
    },
    description="Concat S3 files",
    packages=find_packages(),
    long_description=long_description,
    long_description_content_type='text/x-rst'
)
