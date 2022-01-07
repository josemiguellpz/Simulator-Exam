import pymysql as Database

def getConnectionDB():
    return Database.connect(host='localhost',
                            user='root',
                            password='',
                            db='bdexamenes')