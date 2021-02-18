import os
import aws_sagemaker_remote
#from aws_sagemaker_remote import sagemaker_processing_main
#from aws_sagemaker_remote.args import PathArgument
from aws_sagemaker_remote.commands import run_commands
from aws_concat.concat_files import concat_files_command


def main():
    return run_commands(
        commands={
            "concat-files": concat_files_command()
        },
        description="Concatenate files"
    )


if __name__ == '__main__':
    main()

"""
aws-concat concat-files \
    --input-s3 s3://sagemaker-us-east-1-683880991063/testdata/testoutput/None \
    --output-s3 s3://sagemaker-us-east-1-683880991063/testdata/testoutput/test-output-4.jsonl \
    --concurrency 5
    
"""
