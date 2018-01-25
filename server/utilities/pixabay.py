#!/usr/bin/python

import urllib2
import re
import sys
from gzip import GzipFile
from utility import printMessage, gzipExtend
import json

# reload(sys)
# sys.setdefaultencoding('utf-8')


def getHuabanImagesByRange(page_index):
    url = 'https://pixabay.com/zh/editors_choice/?media_type=photo&pagi=' + page_index
    # url = 'https://pixabay.com/'
    i_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
        "Accept-Encoding": "gzip",
        "Connection": "keep-alive",
        "Host": "pixabay.com",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"}
    req = urllib2.Request(url, headers=i_headers)
    response = urllib2.urlopen(req)
    htmlGzip = response.read()
    html = gzipExtend(htmlGzip)
    reg = re.compile(
        '<img srcset="(.*?) 1x,', re.S)

    groups = re.findall(reg, html)

    return groups


def main():
    page_index = "1" if len(sys.argv) < 2 else (sys.argv[1] or '1')
    print json.dumps(getHuabanImagesByRange(page_index))


if __name__ == '__main__':
    main()
