#!/bin/sh  
# chkconfig: 2345 93 18  

CURRENT_PATH=`pwd`

#MogoDB home directory  
#MONGODB_HOME=/usr/local

#mongodb command  
#MONGODB_BIN=$MONGODB_HOME/bin/mongod
MONGODB_BIN=`which mongod`

#mongodb config file
MONGODB_CONF=$CURRENT_PATH/mongodb.conf

#mongodb PID
MONGODB_PID=$CURRENT_PATH/mongodb.pid

#set open file limit
SYSTEM_MAXFD=4096

MONGODB_NAME="mongodb"
 

if [ ! -f $MONGODB_BIN ]
then
        echo "$MONGODB_NAME startup: $MONGODB_BIN not exists! "  
        exit
fi

start(){
    rm -rf $CURRENT_PATH/data/db/mongod.lock
    "$MONGODB_BIN"  --config=$MONGODB_CONF --fork &
    ret=$?
    if [ $ret -eq 0 ]; then
     	echo "Starting $MONGODB_NAME success"
    else
     	echo "Starting $MONGODB_NAME fail"
    fi

}

stop(){
        PID=$(ps aux |grep "$MONGODB_NAME" |grep "$MONGODB_CONF" |grep -v grep |wc -l) 
        if [[ $PID -eq 0  ]];then
     		echo "Stopping $MONGODB_NAME success"
        exit
        fi
        #kill -HUP `cat $MONGODB_PID`
        kill  `cat $MONGODB_PID`
        ret=$?
        if [ $ret -eq 0 ]; then
     			echo "Stopping $MONGODB_NAME from pid file success"
                rm -f $MONGODB_PID
        else    
                echo "Stopping $MONGODB_NAME from pid file fail, kill from command:"
                PID=$(ps -ef | grep "$MONGODB_NAME" | grep -v 'grep ' | awk '{print $2}')
                #kill -HUP $PID
                kill  $PID
                ret=$? 
                 if [ $ret -eq 0 ]; then
                    echo "Stopping $MONGODB_NAME from process command success"
                 else
                    echo "Stopping $MONGODB_NAME from process command fail"
                 fi
        fi
}

restart() {

        stop
        sleep 2
        start
}

case "$1" in
        start)
                start
                ;;
        stop)
                stop
                ;;
        status)
        status $prog
                ;;
        restart)
                restart
                ;;
        *)
                echo $"Usage: $0 {start|stop|status|restart}"
esac

# chmod u+x /etc/init.d/mongod
