command=${1:-default}

echo ""
echo "Your command: $command "
echo ""
echo " Commands               | What they do"
echo " - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - "

echo " bash app.sh la         | $'ls -a' to list all files and hidden"
la(){ ls -a; echo "hihi"; }

echo " bash app.sh info       | Executes the info function for more info"
info(){ echo " So... here's some more info!"; }

echo " bash app.sh fun        | Executes the test function for more fun"
fun(){ echo " OH BOY! 🤓! This IS fun!🎉"; }

echo " bash app.sh multi      | How to handle a multi-line function"
multi(){ do_multi; }

echo " bash app.sh file       | How to execute a seperate file function"
file(){ bash bigFunction.sh $command; }

echo " bash app.sh runPython  | How to run a python script"
runPython(){ python3 pythonFunction.py $command; }

echo " - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - "
echo ""


# - - - - - Multi-line Functions - - - - - - - - - - - - - - - - - - - - - - - -
do_multi(){
  sleep .5; printf "This "; sleep .5; printf "is "; sleep .5
  printf  "a "; sleep .5; printf "multi-"; sleep .5; printf "line "
  sleep .5; printf "function!"; sleep .5; printf "\n\n"
}


# - - - - - Execute Command - - - - - - - - - - - - - - - - - - - - - - - - - -
if [ $command != "default" ]
then
  $command
fi
echo ""


# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# TO DO
# - Move bob.sh to /Google\ Drive

# NOTES
# arr=(1 2 3)
# echo ${arr[1]}
