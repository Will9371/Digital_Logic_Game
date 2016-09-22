var nbrChallenges = 36
var challenge = [];
for (i = 0; i < nbrChallenges; i++)
	challenge[i] = [];

//0 = empty, 1 = human, 2 = zombie, 3 = zapped human, 4 = zapped zombie, 5 = baby human, 6 = baby zombie, 
//7 = zapped baby human, 8 = zapped baby zombie, 9 = tumbleweed, 10 = zapped tumbleweed, 11 = bouncy ball
//12 = red zombie, 13 = red zapped zombie, 14 = green zombie, 15 = green zapped zombie, 16 = blue zombie, 
//17 = blue zapped zombie, 18 = yellow zombie, 19 = yellow zapped zombie, 20 = purple zombie, 
//21 = purple zapped zombie, 22 = teal zombie, 23 = teal zapped zombie, 24 = white zombie, 25 = white zapped zombie

var row = challenge[0]
row[0] = [0,0,0,0];

var row = challenge[1]	//Intro: Wiring
row[0] = [0,0,0,2];

var row = challenge[2]	//Intro: OR gate
row[2] = [0,0,2,2];      
row[1] = [0,0,2,0];
row[0] = [0,0,0,2];

var row = challenge[3]	//Intro: AND gate
row[2] = [0,0,2,2];
row[1] = [0,0,1,0];
row[0] = [0,0,0,1];

var row = challenge[4]  //Intro: NOT Gate
row[1] = [0,0,0,1];
row[0] = [0,0,0,6];

var row = challenge[5]  //Beginner: NOT gate, less obvious
row[2] = [0,0,1,1];
row[1] = [0,0,2,0];
row[0] = [0,0,0,1];

var row = challenge[6]	//Beginner: NAND
row[2] = [0,0,1,1];		//Unlock NAND, NOR
row[1] = [0,0,2,0];
row[0] = [0,0,0,2];

var row = challenge[7]	//Beginner: Inverted Input
row[3] = [0,0,1,1];
row[2] = [0,0,1,0];
row[1] = [0,0,0,2];
row[0] = [0,0,5,5];

var row = challenge[8]  //Beginner: extra inputs
row[6] = [0,2,2,2];
row[5] = [0,1,1,0];
row[4] = [0,1,0,1];
row[3] = [0,1,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,1,0];
row[0] = [0,0,0,1];

var row = challenge[9]  //SOP: BC + D'
row[7] = [0,2,2,2];
row[6] = [0,2,2,0];
row[5] = [0,1,0,1];
row[4] = [0,2,0,0];
row[3] = [0,0,1,1];
row[2] = [0,0,2,0];
row[1] = [0,0,0,1];
row[0] = [0,6,6,6];

var row = challenge[10]	//POS: B(C+D), only two gates required
row[6] = [0,2,2,2];     //(can also be solved with SOP)
row[5] = [0,2,2,0];     
row[4] = [0,2,0,2];
row[3] = [0,1,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,1,0];
row[0] = [0,0,0,1];

var row = challenge[11]	//If Statements
row[6] = [0,2,2,2];
row[5] = [0,2,2,0];
row[4] = [0,2,0,2];
row[3] = [0,1,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,1,0];
row[0] = [0,0,0,2];

var row = challenge[12] //Without XOR
row[3] = [0,0,1,1];     //Unlock XOR, XNOR Gate
row[2] = [0,0,2,0];
row[1] = [0,0,0,2];
row[0] = [0,0,5,5];

var row = challenge[13]	//With XOR
row[14] = [1,1,1,1];
row[13] = [2,2,2,0];
row[12] = [2,2,0,2];
row[11] = [1,1,0,0];
row[10] = [2,0,2,2];
row[9] = [1,0,1,0];
row[8] = [1,0,0,1];
row[7] = [2,0,0,0];
row[6] = [0,2,2,2];
row[5] = [0,1,1,0];
row[4] = [0,1,0,1];
row[3] = [0,2,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,2,0];
row[0] = [0,0,0,2];

var row = challenge[14] //NAND Master 1 (NOT)
row[1] = [0,0,0,1];
row[0] = [0,0,0,6];

var row = challenge[15] //NAND Master 2 (AND)
row[3] = [0,0,2,2];
row[2] = [0,0,1,0];
row[1] = [0,0,0,1];
row[0] = [0,0,5,5];

var row = challenge[16] //NAND Master 3 (OR)
row[3] = [0,0,2,2];
row[2] = [0,0,2,0];
row[1] = [0,0,0,2];
row[0] = [0,0,5,5];

var row = challenge[17] //NAND Master 4 (XOR)
row[3] = [0,0,1,1];
row[2] = [0,0,2,0];
row[1] = [0,0,0,2];
row[0] = [0,0,5,5];

var row = challenge[18] //Boolean Logic 1
row[15] = [2,2,2,2];     //AB+C'D'
row[14] = [2,2,2,0];
row[13] = [2,2,0,2];
row[12] = [2,2,0,0];
row[1] = [1,0,1,1];
row[10] = [1,0,1,0];
row[9] = [2,0,0,2];
row[8] = [2,0,0,0];
row[7] = [0,1,1,1];
row[6] = [0,1,1,0];
row[5] = [0,2,0,2];
row[4] = [0,2,0,0];
row[3] = [0,0,1,1];
row[2] = [0,0,1,0];
row[1] = [0,0,0,2];
row[0] = [6,6,6,6];

var row = challenge[19]	//Boolean Logic 2
row[1] = [1,1,1,1];     //AB+C'
row[13] = [1,1,1,0];
row[12] = [2,2,0,2];
row[11] = [2,2,0,0];
row[10] = [1,0,1,1];
row[9] = [1,0,1,0];
row[8] = [2,0,0,2];
row[7] = [2,0,0,0];
row[6] = [0,1,1,1];
row[5] = [0,2,2,0];
row[4] = [0,2,0,2];
row[3] = [0,2,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,2,0];
row[0] = [0,0,0,2];

var row = challenge[20]	//Boolean Logic 3
row[7] = [0,2,2,2];     //B'C'D + BC'D' + BCD
row[6] = [0,1,1,0];
row[5] = [0,1,0,1];
row[4] = [0,2,0,0];
row[3] = [0,0,1,1];
row[2] = [0,0,1,0];
row[1] = [0,0,0,2];
row[0] = [0,5,5,5];

var row = challenge[21]	//Boolean Logic 4
row[14] = [1,1,1,1];     //A'B'CD + ABC'D + A'BC'D + AB'CD'
row[13] = [1,1,1,0];
row[12] = [2,2,0,2];
row[11] = [1,1,0,0];
row[10] = [1,0,1,1];
row[9] = [2,0,2,0];
row[8] = [1,0,0,1];
row[7] = [1,0,0,0];
row[6] = [0,1,1,1];
row[5] = [0,1,1,0];
row[4] = [0,2,0,2];
row[3] = [0,1,0,0];
row[2] = [0,0,2,2];
row[1] = [0,0,1,0];
row[0] = [0,0,0,1];

var row = challenge[22]	//Reading Truth Tables 1
row[7] = [0,1,1,1];
row[6] = [0,2,2,0];
row[5] = [0,1,0,1];
row[4] = [0,1,0,0];
row[3] = [0,0,2,2];
row[2] = [0,0,1,0];
row[1] = [0,0,0,1];
row[0] = [0,0,0,5];

var row = challenge[23] //Reading Truth Tables 2
row[7] = [0,1,1,1];
row[6] = [0,2,2,0];
row[5] = [0,2,0,2];
row[4] = [0,1,0,0];
row[3] = [0,0,2,2];
row[2] = [0,0,1,0];
row[1] = [0,0,0,1];
row[0] = [0,6,6,6];

var row = challenge[24] //Simplification 1
row[6] = [0,1,1,1];     //BC'+BD'
row[5] = [0,2,2,0];     //B*(CD)'
row[4] = [0,2,0,2];
row[3] = [0,2,0,0];
row[2] = [0,0,1,1];
row[1] = [0,0,1,0];
row[0] = [0,0,0,1];

var row = challenge[25] //Simplification 2
row[7] = [0,2,2,2];     //B'D + CD + B'C
row[6] = [0,1,1,0];     //(CxD)B' + CD
row[5] = [0,1,0,1];
row[4] = [0,1,0,0];
row[3] = [0,0,2,2];
row[2] = [0,0,2,0];
row[1] = [0,0,0,2];
row[0] = [0,5,5,5];

var row = challenge[26] //Tumbleweeds
row[7] = [0,2,2,2];     //BC+BD'
row[6] = [0,9,9,0];
row[5] = [0,1,0,1];
row[4] = [0,2,0,0];
row[3] = [0,0,1,1];
row[2] = [0,0,1,0];
row[1] = [0,0,0,1];
row[0] = [0,5,5,5];

var row = challenge[27] //Tumbleweeds 2
row[7] = [0,1,1,1];     //C'
row[6] = [0,1,1,0];
row[5] = [0,2,0,2];
row[4] = [0,9,0,0];
row[3] = [0,0,1,1];
row[2] = [0,0,9,0];
row[1] = [0,0,0,2];
row[0] = [0,0,6,0];

//Karnaugh map levels (4 variable), include a video link for the first one.

var row = challenge[28] //Latches 1
     
row[13] = [0,0,0,2];
row[12] = [0,0,1,1];
row[11] = [0,0,1,0];
row[10] = [0,0,1,0];
row[9] = [0,0,1,1];
row[8] = [0,0,1,0];
row[7] = [0,0,2,2];
row[6] = [0,0,0,2];
row[5] = [0,0,2,2];
row[4] = [0,0,2,2];
row[3] = [0,0,2,2];
row[2] = [0,0,0,2];
row[1] = [0,0,1,1]; 
row[0] = [0,0,1,0];

var row = challenge[29] //Latches 2
row[14] = [0,0,6,6];
row[13] = [0,0,6,6];
row[12] = [0,0,0,2];
row[11] = [0,0,1,1];
row[10] = [0,0,1,0];
row[9] = [0,0,0,2];
row[8] = [0,0,5,5];
row[7] = [0,0,1,0];
row[6] = [0,0,5,0];
row[5] = [0,0,1,0];
row[4] = [0,0,6,0];
row[3] = [0,0,0,2];
row[2] = [0,0,0,6];
row[1] = [0,0,0,2];
row[0] = [0,0,1,1];

var row = challenge[30] //Latches 3
row[16] = [0,0,0,5];
row[15] = [0,0,0,1];
row[14] = [0,0,0,5];     //D-latch
row[13] = [0,0,0,1];
row[12] = [0,0,11,0];
row[11] = [0,0,0,2];
row[10] = [0,0,11,9];
row[9] = [0,0,0,5];
row[8] = [0,0,11,0];
row[7] = [0,0,0,1];
row[6] = [0,0,11,0];
row[5] = [0,0,0,2];
row[4] = [0,0,11,2];
row[3] = [0,0,0,6];
row[2] = [0,0,11,2];
row[1] = [0,0,0,1];
row[0] = [0,0,11,5];

var row = challenge[31] //intro to colors 1 (primary)
row[2] = [0,16,0,0];
row[1] = [0,0,14,0];
row[0] = [0,0,0,12];

var row = challenge[32] //intro to colors 2 (combinations)
row[3] = [24,0,0,0];    //this line is creating problems (re connectors)...
row[2] = [0,22,0,0];
row[1] = [0,0,20,0];
row[0] = [0,0,0,18];

var row = challenge[33] //Colors 3 (ANDs)
row[5] = [22,22,0,0];
row[4] = [20,0,20,0];
row[3] = [0,18,18,0];
row[2] = [16,0,0,16];
row[1] = [0,14,0,14];
row[0] = [0,0,12,12];

var row = challenge[34] //Colors 4 (ANDs)
row[5] = [22,22,0,0];   //add new level here
row[4] = [20,0,20,0];
row[3] = [0,18,18,0];
row[2] = [16,0,0,16];
row[1] = [0,14,0,14];
row[0] = [0,0,12,12];


/*var row = challenge[30] //Latches 3
row[14] = [0,0,0,1];     //D-latch
row[13] = [0,0,0,5];
row[12] = [0,0,9,0];
row[11] = [0,0,0,6];
row[10] = [0,0,0,2];
row[9] = [0,0,9,9];
row[8] = [0,0,0,5];
row[7] = [0,0,0,1];
row[6] = [0,0,9,0];
row[5] = [0,0,0,6];
row[4] = [0,0,0,2];
row[3] = [0,0,9,9];
row[2] = [0,0,11,0];
row[1] = [0,0,11,0];
row[0] = [0,0,11,0];*/

var row = challenge[35] //Credits
row[0] = [0,0,0,0];



var levelNames = ["Sandbox Mode",           //Level 0
		  "Intro: Wiring", 			        //Level 1
          "Intro: OR", 			            //Level 2
          "Intro: AND",			            //Level 3
          "Intro: NOT", 			        //Level 4
          "Beginner: Not New",              //Level 5
          "Beginner: NAND",                 //Level 6
          "Beginner: Inverted Input",       //Level 7
		  "Beginner: Extra Inputs",         //Level 8
          "Basic Logic: SOP", 	            //Level 9
          "Basic Logic: POS",               //Level 10                 
          "Basic Logic: If Statements", 	//Level 11
          "Building XOR",		            //Level 12
		  "Using XOR", 		                //Level 13
          "NAND master 1",		            //Level 14 
		  "NAND master 2",			        //Level 15
		  "NAND master 3",                  //Level 16
          "NAND master 4",                  //Level 17
          "Boolean Logic 1", 		        //Level 18
          "Boolean Logic 2",			    //Level 19
          "Boolean Logic 3",		    	//Level 20
          "Boolean Logic 4",                //Level 21
          "Reading Truth Tables 1",			//Level 22
		  "Reading Truth Tables 2",			//Level 23
		  "Simplification 1",       	    //Level 24
          "Simplification 2",       	    //Level 25  
          "Simplification 3",               //Level 26
          "Simplification 4",               //Level 27
          "Latches 1",                      //Level 28
          "Latches 2",                      //Level 29
          "Latches 3",                      //Level 30
          "Colors 1",                       //Level 31
          "Colors 2",                       //Level 32
          "Colors 3",                       //Level 33  
          "Colors 4",                       //Level 34                  
          "Credits",];                      //Level 35
                                            			                      
var message = [];
message[0]  = 	"Welcome to Zombie Gates, by Playcraft.  Play around in the sandbox for a digital logic simulator.  When you are ready, try a challenge!  Zap the zombies, spare the humans, save the world!  For an intro video, enter this URL into your browser: https://www.youtube.com/watch?v=HNeMMBXj3k8";
message[1]  = 	"Use the wire tool by selecting the box with the line and then click and drag along the wire path to connect an input on the left to the output on the right to complete the circuit";
message[2]  = 	"Click and drag gates from the toolbar to place them and then connect wires to the lines going in and out";
message[3]  = 	"Experiment with different gates to see how they work";
message[4]  =   "The baby zombie is too light to activate the button, but you still need to zap it.";
message[5]  =   "You have built this before.  Just focus on one column, never mind about the other";
message[6]  = 	"You can invert the output of a gate to give it the opposite result.";
message[7]  =   "You can also invert the input of a gate.";
message[8]  = 	"Gates only have 2 inputs...how might you arrange them to get more?";
message[9]  =   "Think of it this way: if B and C is on, or if D is not on, zap.  Or, in SOP (sum of products) notation: BC+D&rsquo;";
message[10] =   "Think of it this way: if B and C or D is on, zap.  Or, in POS (product of sums) notation: B(C+D)";
message[11] = 	"If C is ON, B determines the result, but if C is off, D determines the result. 4 gates maximum.  For this challenge, you will need a connector (select the tool next to the wire) to split a wire, allowing a single input to go two places.";
message[12] = 	"One or the other, but not both.  5 gates needed";
message[13] = 	"Similar challenge as before, but now with XOR gates!  3 gates needed.";
message[14] =   "There was a storm and we lost all of our gates!  Well, except for the NANDs, we still have those.  And we can use those to rebuild the rest.  Start by creating a NOT gate out of NAND gates.";
message[15] = 	"Create an AND gate out of NAND gates.";
message[16] = 	"Create an OR gate out of NAND gates.  Hint: a NAND is the same as an OR with two inverted inputs.";
message[17] = 	"Create an XOR gate out of NAND gates.";
message[18] = 	"Don&rsquo;t be intimitated by the crowd, one short Boolean Logic code can tell you many conditions.  Like this one: AB+C'.  Any letter with a &rsquo; after it is inverted. Letters next to each other are ANDed. + means OR.";
message[19] = 	"A NOT outside of a code means it should go after the output, rather than before an input. For example (AC+DC)&rsquo;";
message[20] =   "As the equations get trickier, it becomes important to stay organized.  Start by splitting each input into two paths and inverting one of them.  Each group of letters gets its own AND gate (remember the lesson about getting more than 2 inputs into a gate?).  The output of these AND gates are all connected to an OR.  The final OR goes to the tesla coil output.  B&rsquo;C&rsquo;D + BC&rsquo;D&rsquo; + BCD"
message[21] = 	"Time to prove your mastery of Boolean Logic. A&rsquo;B&rsquo;CD + ABC&rsquo;D + A&rsquo;BC&rsquo;D + AB&rsquo;CD&rsquo;.  Try to solve this by yourself, but if you get stuck or would like some tips on staying organized, watch this video: https://www.youtube.com/watch?v=TaPtnmftALM";
message[22] = 	"You can figure out the Boolean Logic for yourself by examining the truth table.  Ignore the rows with humans.  For each row of skeletons, write down each letter. Add a NOT symbol for each letter corresponding to an empty cell.  AND all of these together.  Repeat for the next row of skeletons.  Then OR each of these groups of letters together.  Solve in 7 gates...2 if you are tricky.";
message[23] = 	"More ON conditions makes things more complicated, but the process remains the same.";
message[24] = 	"It is best to simplify your logic when possible.  The trick is to find patterns.  For example, if B is ON and C is OFF, then D can be either on or off and thus can be disregarded.  In other words, BC&rsquo;D + BC&rsquo;D&rsquo; + BCD&rsquo; simplifies to BC&rsquo; + BCD&rsquo;.  Can you find the other pattern?  5 gate maximum...but if you really want to get fancy, solve it with 2.";
message[25] =   "Find 3 patterns for the standard solution.  6 gate maximum.  Fancypants solves in 5.";
message[26] =   "A row of tumbleweeds is approaching.  Zap them, or don&rsquo;t, whichever is more convenient.  4 gate maximum.  Fancypants solves in 3."
message[27] =   "Sometimes it is useful to zap the tumbleweeds, sometimes it is better to let them pass.  1 gate maximum.";
message[28] =   "The output of a latch is determined both by its present state and its past state.  See for yourself by taking two NAND gates and sending the output of each to the input of the other.";
message[29] =   "Another latch with the same Set-Reset (SR) structure, but with a different type of gate.";
message[30] =   "For this D-latch: when C (the clock) is ON, the output follows D; when C is OFF, the output does not change.  Think of an IF statement (but NOT with ANDs!) feeding into a NAND latch.  Bouncing balls pulse the clock on for just a moment.  Use RUN, not STEP, when finished."
message[31] =   "Great Scott, the zombies have mutated! They are becoming resistant to our tesla coil, but they still have weaknesses. Now you will need to use different outputs to match the color of the electricity to the color of the zombies.";
message[32] =   "Turn on multiple outputs at the same time to get additional colors.  Use gates as buffers to prevent the signals from interfering.";
message[33] =   "DESCRIPTION NEEDED";
message[34] =   "TBA";
message[35] =   "Thank you for playing Zombie Gates!  Game and level design, assistant programmer: Will Petillo, Lead Programmer: Bill Petillo. Find more games at www.playcrafttoys.com. Questions or feedback? Send an email to will.petillo @playcrafttoys.com";

var disable = [];		     //0 = enable, 1 = disable
disable[0]  = [0,0,0,0,0,0]; //OR, NOR, AND, NAND, XOR, NOT
disable[1]  = [1,1,1,1,1,1]; //Wiring
disable[2]  = [0,1,1,1,1,1]; //OR
disable[3]  = [0,1,0,1,1,1]; //AND
disable[4]  = [0,1,0,1,1,0]; //NOT 1
disable[5]  = [0,1,0,1,1,0]; //NOT 2
disable[6]  = [0,1,0,1,1,0]; //NAND
disable[7]  = [0,0,0,0,1,0]; //Inv.input
disable[8]  = [0,0,0,0,1,0]; //Extra inputs
disable[9]  = [0,0,0,0,1,0]; //SOP
disable[10] = [0,0,0,0,1,0]; //POS
disable[11] = [0,0,0,0,1,0]; //If
disable[12] = [0,0,0,0,1,0]; //XOR 1
disable[13] = [1,1,1,1,0,1]; //XOR 2
disable[14] = [1,1,1,0,1,1]; //NAND 1
disable[15] = [1,1,1,0,1,1]; //NAND 2
disable[16] = [1,1,1,0,1,1]; //NAND 3
disable[17] = [1,1,1,0,1,1]; //NAND 4
disable[18] = [0,0,0,0,0,0]; //BL 1
disable[19] = [0,0,0,0,0,0]; //BL 2
disable[20] = [0,1,0,1,1,0]; //BL 3
disable[21] = [0,0,0,0,0,0]; //BL 4
disable[22] = [0,0,0,0,0,0]; //RTT 1
disable[23] = [0,0,0,0,0,0]; //RTT 2
disable[24] = [0,0,0,0,0,0]; //Simplification 1
disable[25] = [0,0,0,0,0,0]; //Simplification 2
disable[26] = [0,0,0,0,0,0]; //Simplification 3
disable[27] = [0,0,0,0,0,0]; //Simplification 4
disable[28] = [0,0,0,0,0,0]; //Latch 1
disable[29] = [0,0,0,0,0,0]; //Latch 2
disable[30] = [0,0,0,0,0,0]; //Latch 3
disable[31] = [1,1,1,1,1,1]; //Colors 1
disable[32] = [0,1,1,1,1,1]; //Colors 2
disable[33] = [0,1,0,1,1,0]; //Colors 3
disable[34] = [0,0,0,0,0,0]; //Colors 4
disable[35] = [1,1,1,1,1,1]; //Credits 



