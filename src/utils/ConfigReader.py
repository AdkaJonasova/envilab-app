from configparser import ConfigParser
import os


def load_config(filename='database.ini', section='postgresql'):
    work_directory = os.path.dirname(os.path.abspath(__file__))
    config_filename = os.path.join(work_directory, filename)

    parser = ConfigParser()
    parser.read(config_filename)

    config = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            config[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return config
