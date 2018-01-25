#!/usr/bin/python

import sys

from gzip import GzipFile
from StringIO import StringIO

reload(sys)
sys.setdefaultencoding('utf-8')


def printMessage(str):
    # print str
    pass


def gzipExtend(data):
    buf = StringIO(data)
    f = GzipFile(fileobj=buf)
    return f.read()
