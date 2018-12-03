#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std; // required to short-hand std::cout / std::endl; etc...

int main(){

  cout << "Hello World" << endl;  // you'd need to write it like this... `std::cout << "Hello World" << std::endl;` if you didn't add the `using namespace std;`

  int myInt = 3;
  const int myConstInt = 4; // cannot be changed!
  float myFloat = 1.23456789;
  double myDouble = 1.2345678901234; // As the name implies, a double has 2x the precision of float[1]. In general a double has 15 decimal digits of precision, while float has 7.
  char myGrade = 'C'; // requires single-quotes.

  string myString = "!Hello World!"; // requires double-quotes.
  bool isCool = false;
  int largestNumber = 2147483647; // try 2147483648 here, it will print incorrect.
  long int largerNumber = 2147483648;


  cout << "myInt: " <<  myInt << endl;
  cout << "myFloat: " << myFloat << endl; // only prints 4.12345
  cout.precision(14); // to show the actual value of doubles, we need to modify cout to print entire value. here we set it to 14 decimals
  cout << "myDouble: " << myDouble << endl;

  cout << "\nsizeof(myInt): " << sizeof(myGrade) << endl; // 1 === 1byte
  cout << "sizeof(myDouble): " << sizeof(myDouble) << endl;
  cout << "largestNumber: " << largestNumber << endl;
  cout << "largerNumber: " << largerNumber << endl;






  cout << myString << endl;
  return 0;

}
