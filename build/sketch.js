var outputText = '';

var keyboardDisplay; 
var plugboard;

var input;
var output;

function setup()
{
    frameRate(30);
    // put setup code here
    //createCanvas(800, 600);
    //createCanvas(960, 720);
    createCanvas(1152, 648);
    //createCanvas(windowWidth, windowHeight);

    keyboardDisplay = new KeyboardDisplay();
    plugboard = new Plugboard();
    engine = new Engine(plugboard);

    createForm();
    createHelp();
}

function createForm()
{
    input = createInput();
    input.id('plaintext');
    input.size(width/1.7, input.height);
    input.style('font-size', '20px');
    input.style('text-transform', 'uppercase');
    input.position(width/2-input.width/2, plugboard.y+plugboard.spaceY*2+PlugSlot.START_HEIGHT/2 + 16);
    input.attribute('placeholder', 'Plaintext');
    input.attribute('type', 'text');
    input.style('background','rgba(255, 255, 255, 0.75)');
    input.style('font-family', 'monospace');
    input.attribute('value', '')
    input.input(inputEvent);

    input.attribute('onblur', 'inputOnBlur()');

    output = createInput();
    output.id('ciphertext');
    output.size(width/1.7, output.height);
    output.style('font-size', '20px');
    output.style('text-transform', 'uppercase');
    output.position(input.x, input.y+input.height + 10);
    output.attribute('placeholder', 'Ciphertext');
    output.attribute('type', 'text');
    output.attribute('value', '')
    output.style('background', 'rgba(221, 221, 221, 0.75)');
    output.style('font-family', 'monospace');
    output.attribute('readonly', 'readonly');
}

function inputOnBlur()
{
    scrollElementToRight("plaintext");
}

function createHelp()
{
    let helpDiv = createDiv();

    helpDiv.style('width', ''+width+'px');
    helpDiv.style('height', 'auto');
    helpDiv.position(0, 0);
//helpDiv.style('pointer-events', 'none;');

    let helpButton = createButton("? Help");
    helpButton.parent(helpDiv);
    helpButton.style('font-size', '20px');
    helpButton.style('float', 'right');
    helpButton.mouseClicked(openHelpMenu);

    let helpMenu = createDiv();
    helpMenu.parent(helpDiv);
    helpMenu.id('helpMenu');
    helpMenu.style('z-index', '5');
    helpMenu.style('font-size', '20px');
    helpMenu.style('background-color','#f1f1f1');
    helpMenu.style('position', 'fixed');
    helpMenu.style('width', '0');
    //helpMenu.style('height', 'auto');
    helpMenu.style('height', height+'px');
    helpMenu.style('right', '0');
    helpMenu.style('top', '0');
    //helpMenu.style('overflow','auto');
    //helpMenu.style('overflow','scroll');
    helpMenu.style('overflow','hidden');
    helpMenu.style('transition', '0.5s');

    let topDiv = createDiv('&nbsp;');
    //let topDiv = createDiv('');
    topDiv.parent(helpMenu);
    topDiv.style('width', 'auto');
    topDiv.style('height', 'auto');
    topDiv.style('font-family', 'Arial');
    topDiv.style('font-size', '24px');

    //let a = createA('javascript:void(0)', '&times;');
    let a = createA('javascript:void(0)', 'Close &#10006;');
    a.parent(topDiv);
    a.mouseClicked(closeHelpMenu);
    a.style('position', 'absolute');
    a.style('top', '0');
    a.style('right', '0');
    a.style('float', 'right');
    a.style('margin-right', '5px');
    a.style('text-decoration', 'none');
    a.style('color', '#111');
    a.style('font-size', '24px');
    //a.style('font-family', 'Arial');
    a.style('display', 'block');

    let contentDiv = createDiv();
    contentDiv.parent(helpMenu);
    contentDiv.style('white-space', 'pre-wrap;');
    contentDiv.style('width', '400px');
    contentDiv.style('height', '100%');

    contentDiv.style('overflow', 'scroll');

    let content = createElement('pre',"Instructions\n"+
    "\n"+
    "Before typing a message, both the person sending and the person receiving the message must have the same settings.\n"+
    "\n"+
    "The sender types in a message in plaintext, then sends the scrambled ciphertext.\n"+
    "The receiver input the scrambled message to receive decrypted message.\n"+
    "\n"+
    "The settings are: Rotor Order, Rotor Setting, Ring Setting, Reflector, Plugboard Setting\n"+
    "\n"+
    "The following will describe how to adjust the settings.\n"+
    "\n"+
    "Rotor Order\n" +
    "The rotor slot is located at centre top.\n" +
    "The rotors are labelled: I, II, III, IV, V\n" +
    "Drag rotor in rotor slot area to change order.\n" +
    "Drag rotor out of rotor slot area to remove rotor.\n" +
    "Drag rotor onto rotor slot area to add rotor.\n" +
    "The red bar indicator shows where rotor will be placed in rotor slot.\n" +
    "\n"+
    "Rotor Setting\n" +
    "The red letter/number shows the current rotor setting.\n" +
    "The rotor setting can be adjusted by clicking on the rotor, but not the area where alphabet letter and number pairs are shown.\n" +
    "Click top half of the area to rotate rotor upwards.\n" +
    "Click lower half of the area to rotate rotor downwards.\n" +
    "\n"+
    "Ring Setting\n" +
    "The ring is the area on the rotor with letter/number pairs: A01, B02, C03... Z26\n" +
    "The red &lt; points to the current ring setting.\n" +
    "Click top half of ring to rotate ring upwards.\n" +
    "Click lower half of ring to rotate ring downwards.\n" +
    "\n"+
    "Reflector\n" +
    "Reflector slot is located left of rotor slots.\n" +
    "The reflectors are labelled: B or C\n" +
    "Drag reflector out of reflector slot area to remove reflector.\n" +
    "Drag reflector onto empty reflector area to add reflector.\n" +
    "\n"+
    "Plugboard Setting\n" +
    "Plug slots are located below the keys.\n" +
    "A cable has plugs on both ends connected by a wire.\n" +
    "Connect a cable between 2 plug slots to form a plugboard setting.\n" +
    "Drag plug out of plug slot to disconnect cable.\n" +
    "Drag plug onto empty plug slot to connect one end of cable.\n"
    );

    content.parent(contentDiv);
    content.style('white-space', 'pre-wrap');
    content.style('font-size', '24px');

    content.style('margin-top', '0');

}

function openHelpMenu()
{
    //document.getElementById("helpMenu").style.display = "block";
    document.getElementById("helpMenu").style.width = "400px";
}

function closeHelpMenu()
{
    //document.getElementById("helpMenu").style.display = "none";
    document.getElementById("helpMenu").style.width = "0";
}

function inputEvent()
{
    engine.loadRotors();

    let outputValue = '';

    for(let i = 0; i < input.value().length; i++)
    {
        if(/^[a-zA-Z]+$/.test(input.value()[i]))
        {
            let result = engine.cipher(input.value()[i])
            if(result)
            {
                if(i == input.value().length-1)
                {
                    //alert("here");
                    keyboardDisplay.lightKey = result;
                }

                outputValue += result;
            }
        }
    }

    output.value(outputValue);

    scrollElementToRight('ciphertext');
}

function scrollElementToRight(id)
{
    let element = document.getElementById(id);
    if(element)
    {
        element.scrollLeft = element.scrollWidth;
    }
}

function windowResized()
{
    //resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
    push();

    background(200);

    keyboardDisplay.draw();
   
    plugboard.draw();

    engine.draw();

    WidgetHandler.draw();

    if(outputText && outputText.length > 0)
    {
        //debug only
        textAlign(LEFT, BASELINE);
        fill(0);
        stroke(0);
        text("debug: " + outputText, 5 , 20);
    }

    pop();
}

function keyPressed()
{
    keyboardDisplay.keyPressed();

    if(document.activeElement.tagName != "INPUT" && !keyIsDown(CONTROL))
    {
        let result = engine.cipher(keyboardDisplay.pressedKey)
        if(result)
        {
            input.value(input.value()+keyboardDisplay.pressedKey);
            inputEvent();

            scrollElementToRight("plaintext");

            keyboardDisplay.lightKey = result;
        }
    }

    keyboardDisplay.pressedKey = '';
}


function keyReleased()
{
    keyboardDisplay.lightKey = '';
    keyboardDisplay.pressedKey = '';
}


function mousePressed()
{
    keyboardDisplay.mousePressed();

    if(keyboardDisplay.pressedKey)
    {
        let result = engine.cipher(keyboardDisplay.pressedKey)
        if(result != null)
        {
            input.value(input.value()+keyboardDisplay.pressedKey);
            inputEvent();

            keyboardDisplay.lightKey = result;
        }

        keyboardDisplay.pressedKey = '';
    }

    WidgetHandler.mousePressed();
}

function mouseReleased()
{
    keyboardDisplay.pressedKey = '';   
 
    let toSave = false;
    if(!WidgetHandler.isDragging && WidgetHandler.holding instanceof Rotor && WidgetHandler.holding.collideRotorStack())
    {
        toSave = true;
    }

    WidgetHandler.mouseReleased();

    if(toSave)
    {
         engine.saveRotors();
    //     inputEvent();
    }

    keyboardDisplay.lightKey = '';
}

function mouseDragged()
{
    WidgetHandler.mouseDragged();
}
