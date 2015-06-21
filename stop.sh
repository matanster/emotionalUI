ps -ef | grep "\bnode\b"
killall -w -signal 9 -v -i -r "\bnode\b"