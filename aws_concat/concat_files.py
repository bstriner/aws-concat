from aws_sagemaker_remote.lamb.main import LambdaCommand, LambdaConfig
import os
from aws_sagemaker_remote.commands import run_command
import argparse


def concat_files_argparse_callback(parser: argparse.ArgumentParser):
    parser.add_argument(
        '--input-s3', default=None, type=str, required=True, help='Input path on S3'
    )
    parser.add_argument(
        '--output-s3', default=None, type=str, required=True, help='Output path on S3'
    )
    parser.add_argument(
        '--concurrency', default=5, type=int, required=True, help='Concurrent downloads'
    )
    parser.add_argument(
        '--mode', default='json', type=str, help='Mode to read/write files (json or raw)'
    )


def concat_files_event_callback(args):
    return {
        'inputS3': args.input_s3,
        'outputS3': args.output_s3,
        'concurrency': args.concurrency,
        'mode': args.mode
    }


def concat_files_command():
    return LambdaCommand(
        config=LambdaConfig(
            stack_name='concat-files',
            code_dir=os.path.abspath(os.path.join(
                __file__, '../concatFiles'
            )),
            profile='default',
            argparse_callback=concat_files_argparse_callback,
            event_callback=concat_files_event_callback,
            webpack=True,
            # manifest=None,
            # report=None
        )
    )


def main():
    cmd = concat_files_command()
    run_command(cmd, description="Concatenate files")


if __name__ == '__main__':
    main()
