var pools = {
	five: "acorn@,acute@,aloha@,alone@,along@,amber@,apple@,bongo@,beeps@,buddy@,clock@,crass@,crime@,crumb@,crypt@,cubed@,daunt@,death@,deter@,diary@,djinn@,drain@,drops@,easel@,earns@,flame@,flute@,freak@,ghost@,gloom@,group@,hello@,horse@,ideal@,igloo@,jumps@,jazzy@,kills@,knife@,lapis@,later@,leaps@,maybe@,mouth@,murky@,night@,noose@,odors@,opine@,piled@,prick@,prism@,queen@,quote@,rainy@,rules@,sarin@,space@,stars@,sting@,scary@,trine@,tread@,tryst@,urine@,umbra@,union@,unary@,value@,vices@,video@,where@,wring@,weepy@,wonky@,worst@,xenia@,xenon@,xerox@,yells@,yodel@,young@,youth@,yurts@,zebra@,zesty@,zilch@,zonal@,zooms",
	seven: "abalone@,abandon@,aerobic@,buckled@,buddies@,bottoms@,crackle@,capital@,dankest@,dissent@,earplug@,elysian@,eternal@,expunge@,exploit@,fateful@,foxtrot@,fuchsia@,gaseous@,gazelle@,gimmick@,goodbye@,heinous@,hellbox@,hypoxia@,ideally@,isolate@,jacuzzi@,jesting@,jughead@,junkies@,katydid@,knavish@,lacquer@,lateral@,lettuce@,lexicon@,lurking@,married@,mugwort@,mummify@,neither@,nucleus@,octopus@,outside@,paprika@,pumpkin@,recycle@,rejoice@,rummage@,sadness@,satchel@,shamble@,tadpole@,treetop@,uncoded@,upstart@,valiant@,veering@,volcano@,wannabe@,windbag@,yawning@,younger@,zipping@,zygotes",
	nine: "alongside@,andromeda@,apathetic@,ballistic@,benchmark@,blackmail@,blasphemy@,centurion@,checkmate@,chubbiest@,cosmonaut@,demagogue@,dignified@,dubiously@,emergency@,existence@,firetruck@,fruitless@,grayscale@,gunpowder@,hairbrush@,hyperlink@,impulsive@,insidious@,jumpsuits@,jitterbug@,kingmaker@,knockdown@,legendary@,lumbering@,manticore@,mausoleum@,mutations@,nightclub@,numbskull@,otherness@,pantomime@,phenotype@,pistachio@,quickness@,quadratic@,racketeer@,reinstall@,scripture@,spearfish@,tantalize@,thinkable@,trappings@,uncovered@,upwelling@,verminous@,visualize@,volunteer@,whitewash@,worksheet@,wuthering@,wrestling@,wuthering@,xylophone@,yodellers@,zookeeper@,zucchinis"
}
var alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');

var currentPool;
var triedLetter;

//Initialize the game and returns the 1st guess
function startGame(mode) {
	currentPool = pools[mode].split('@,');
	triedLetter = [];
	
	var nextGuess = calculateNextGuess();
	
	return nextGuess;
}

//With the current pool, what letter should we guess?
function calculateNextGuess() {
	if (currentPool.length === 1)
		return 'Word found, it\'s <strong>' + currentPool[0] + "</strong>";
	else if (currentPool.length <= 0)
		return '<em>Unable to find a matching word.</em>'
	
	var uniqueLetterCount = alphabet.reduce((a,v) => ({ ...a, [v]: 0}), {});

	currentPool.forEach(currentPW => {
		alphabet.forEach(letter => {
			if (triedLetter.includes(letter))
				return;
			
			if (currentPW.match(letter)) {
				uniqueLetterCount[letter]++;
			}
		});
	});
	
	var maxOccur = {letter: null, occur: 0};
	
	for (var letter in uniqueLetterCount) {
		if (uniqueLetterCount[letter] > maxOccur.occur && isUsefulGuess(letter, uniqueLetterCount[letter])) {
			maxOccur.letter = letter;
			maxOccur.occur = uniqueLetterCount[letter];
		}
	}
	
	return 'Guess <strong>' + maxOccur.letter + '</strong> it\'s in ' + maxOccur.occur + ' / ' + currentPool.length + ' words.';
}

function isUsefulGuess(letter, count) {
	if (count < currentPool.length)
		return true;
	
	//not a useful letter guess if all the partterns are the same
	var pattern;
	return !currentPool.every(currentPW => {
		var currentPattern = currentPW.replace(new RegExp('[^' + letter + ']', 'g'), '.');
		if (!pattern)
			pattern = currentPattern;
		
		return pattern == currentPattern;
	});
}

//Filter out non matches of the current hangman, dot = unknown letter
function processFound(hangman) {
	triedLetter.push(...hangman.split('')) //hacky
	
	currentPool = currentPool.filter(currentPW => 
		currentPW.match(new RegExp(hangman))
	);
}

//Filter out words containing a not found letter
function processNotFound(letter) {
	triedLetter.push(letter);
	
	currentPool = currentPool.filter(currentPW => 
		!currentPW.match(letter)
	);
}

//startGame('seven');
//processFound('...e...');
//calculateNextGuess();
//processNotFound('a');
//calculateNextGuess()
