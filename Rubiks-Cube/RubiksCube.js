var AnglePos = 0;
var interval;
var speed = 1;
var randflag = 0;

function rotation(side) {
  if (randflag) {
    speed = 5;
  } else {
    speed = 1
  };
  turnFace(side);
  AnglePos += speed;
  if (AnglePos == 90) { //If a full rotation happens, reset
    clearInterval(interval);
    isAnimating = false;
    AnglePos = 0;
    updatePosition(side);
    var solve = verify(); //check cube
    if (solve) {
      document.getElementById("status").innerHTML = "Rubiks Cube: Solved";
    } else {
      document.getElementById("status").innerHTML = "Rubiks Cube: Not solved";
    }
  }
}

function turnFace(side) {
  var direc, val, axis, i;
  if (side) {
    switch (side) {
      case "X0":
        axis = 0;
        val = -1;
        direc = 1;
        break;
      case "x0":
        axis = 0;
        val = -1;
        direc = 0;
        break;
      case "X1":
        axis = 0;
        val = 0;
        direc = 1;
        break;
      case "x1":
        axis = 0;
        val = 0;
        direc = 0;
        break;
      case "X2":
        axis = 0;
        val = 1;
        direc = 0;
        break;
      case "x2":
        axis = 0;
        val = 1;
        direc = 1;
        break;
      case "Z2":
        axis = 1;
        val = 1;
        direc = 0;
        break;
      case "z2":
        axis = 1;
        val = 1;
        direc = 1;
        break;
      case "Z0":
        axis = 1;
        val = -1;
        direc = 1;
        break;
      case "z0":
        axis = 1;
        val = -1;
        direc = 0;
        break;
      case "Z1":
        axis = 1;
        val = 0;
        direc = 1;
        break;
      case "z1":
        axis = 1;
        val = 0;
        direc = 0;
        break;
      case "Y0":
        axis = 2;
        val = 1;
        direc = 0;
        break;
      case "y0":
        axis = 2;
        val = 1;
        direc = 1;
        break;
      case "Y2":
        axis = 2;
        val = -1;
        direc = 1;
        break;
      case "y2":
        axis = 2;
        val = -1;
        direc = 0;
        break;
      case "Y1":
        axis = 2;
        val = 0;
        direc = 0;
        break;
      case "y1":
        axis = 2;
        val = 0;
        direc = 1;
        break;
    }
  }
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      for (var z = 0; z < 3; z++) {
        if (cubePos[x][y][z][axis] == val) {
          i = getRotationMatrix(x - 1, y - 1, z - 1);
          if (!direc) {
            i = mult(i, rotate(speed, getRotationAxis(x - 1, y - 1, z - 1)[axis]));
          } else {
            i = mult(i, rotate(speed, negate(getRotationAxis(x - 1, y - 1, z - 1)[axis])));
          }
          setRotationMatrix(x - 1, y - 1, z - 1, i);
        }
      }
    }
  }
}

function updatePosition(side) {
  var i, j, k, val;
  switch (side) {
    case "X0":
      i = 0;
      j = 2;
      k = 1;
      val = -1;
      break;
    case "x0":
      i = 0;
      j = 1;
      k = 2;
      val = -1;
      break;
    case "X2":
      i = 0;
      j = 1;
      k = 2;
      val = 1;
      break;
    case "x2":
      i = 0;
      j = 2;
      k = 1;
      val = 1;
      break;
    case "Z2":
      i = 1;
      j = 2;
      k = 0;
      val = 1;
      break;
    case "z2":
      i = 1;
      j = 0;
      k = 2;
      val = 1;
      break;
    case "Z0":
      i = 1;
      j = 0;
      k = 2;
      val = -1;
      break;
    case "z0":
      i = 1;
      j = 2;
      k = 0;
      val = -1;
      break;
    case "Z1":
      i = 1;
      j = 0;
      k = 2;
      val = 0;
      break;
    case "z1":
      i = 1;
      j = 2;
      k = 0;
      val = 0;
      break;
    case "Y0":
      i = 2;
      j = 0;
      k = 1;
      val = 1;
      break;
    case "y0":
      i = 2;
      j = 1;
      k = 0;
      val = 1;
      break;
    case "Y1":
      i = 2;
      j = 0;
      k = 1;
      val = 0;
      break;
    case "y1":
      i = 2;
      j = 1;
      k = 0;
      val = 0;
      break;
    case "Y2":
      i = 2;
      j = 1;
      k = 0;
      val = -1;
      break;
    case "y2":
      i = 2;
      j = 0;
      k = 1;
      val = -1;
      break;
    case "X1":
      i = 0;
      j = 2;
      k = 1;
      val = 0;
      break;
    case "x1":
      i = 0;
      j = 1;
      k = 2;
      val = 0;
      break;
  }
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      for (z = 0; z < 3; z++) {
        var tempVar = [];
        if (cubePos[x][y][z][i] == val) {
          tempVar = cubePos[x][y][z][j];
          cubePos[x][y][z][j] = cubePos[x][y][z][k];
          cubePos[x][y][z][k] = -tempVar;
          tempVar = cubePos[x][y][z][3][k];
          cubePos[x][y][z][3][k] = negate(cubePos[x][y][z][3][j]);
          cubePos[x][y][z][3][j] = tempVar;
        }
      }
    }
  }
}

function verify() {
  var state;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      // Six faces
      state = cubePos[0][0][0][3];
      for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
          for (z = 0; z < 3; z++) {
            // Nine cubes on each face
            if (cubePos[x][y][z][3][i][j] != state[i][j]) {
              if (x == 1 && z == 1) {
                if (cubePos[x][y][z][3][1][j] != state[1][j]) {
                  return false;
                }
              } else if (x == 1 && y == 1) {
                if (cubePos[x][y][z][3][2][j] != state[2][j]) {
                  return false;
                }
              } else if (y == 1 && z == 1) {
                if (cubePos[x][y][z][3][0][j] != state[0][j]) {
                  return false;
                }
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
}

var canvas, gl;
var program;
var angles = [radians(45), radians(45)];
var vertColor;
var isAnimating = false;
var animationQueue = [];

var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);


var CONTENT;
var LOADED = false;
const COLORS = [ //chose colors I thought were pretty to be honest
  // Back
  [0.5, 0.5, 0.0, 1.0],
  [0.5, 0.5, 0.0, 1.0],
  [0.5, 0.5, 0.0, 1.0],
  [0.5, 0.5, 0.0, 1.0],
  // Front
  [1.0, 1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0, 1.0],
  // Left
  [0.0, 0.5, 0.5, 1.0],
  [0.0, 0.5, 0.5, 1.0],
  [0.0, 0.5, 0.5, 1.0],
  [0.0, 0.5, 0.5, 1.0],
  // Right
  [0.0, 0.0, 1.0, 1.0],
  [0.0, 0.0, 1.0, 1.0],
  [0.0, 0.0, 1.0, 1.0],
  [0.0, 0.0, 1.0, 1.0],
  // Bottom
  [0.0, 1.0, 0.5, 1.0],
  [0.0, 1.0, 0.5, 1.0],
  [0.0, 1.0, 0.5, 1.0],
  [0.0, 1.0, 0.5, 1.0],
  // Top
  [1.0, 0.0, 0.0, 1.0],
  [1.0, 0.0, 0.0, 1.0],
  [1.0, 0.0, 0.0, 1.0],
  [1.0, 0.0, 0.0, 1.0],
];

var vertexColors = [];

var vertices = [
  -1, -1, -1,
  1, -1, -1,
  1, 1, -1,
  -1, 1, -1,
  -1, -1, 1,
  1, -1, 1,
  1, 1, 1,
  -1, 1, 1,
  -1, -1, -1,
  -1, 1, -1,
  -1, 1, 1,
  -1, -1, 1,
  1, -1, -1,
  1, 1, -1,
  1, 1, 1,
  1, -1, 1,
  -1, -1, -1,
  -1, -1, 1,
  1, -1, 1,
  1, -1, -1,
  -1, 1, -1,
  -1, 1, 1,
  1, 1, 1,
  1, 1, -1,
];

var indices = [

  0, 1, 2,
  0, 2, 3, // front
  4, 5, 6,
  4, 6, 7, // back
  8, 9, 10,
  8, 10, 11, // left
  12, 13, 14,
  12, 14, 15, // right
  16, 17, 18,
  16, 18, 19, // bottom
  20, 21, 22,
  20, 22, 23, // top
];

var cubePos = [
  [
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ]
  ],
  [
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ]
  ],
  [
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ]
  ]
];


var X0Rotate = ["X0", "Y0", "X2", "Y2", "X0", "Y0", "X2", "Y2"];
var X1Rotate = ["X1", "Y1", "x1", "y1", "X1", "Y1", "x1", "y1"];
var X2Rotate = ["X2", "Y2", "X0", "Y0", "X2", "Y2", "X0", "Y0"];
var Z2Rotate = ["Z0", "Z0", "Z0", "Z0", "Z2", "Z2", "Z2", "Z2"];
var Z1Rotate = ["z1", "z1", "z1", "z1", "Z1", "Z1", "Z1", "Z1"];
var Z0Rotate = ["Z2", "Z2", "Z2", "Z2", "Z0", "Z0", "Z0", "Z0"];
var Y0Rotate = ["Y2", "X0", "Y0", "X2", "Y0", "X2", "Y2", "X0"];
var Y1Rotate = ["y1", "X1", "Y1", "x1", "Y1", "x1", "y1", "X1"];
var Y2Rotate = ["Y0", "X2", "Y2", "X0", "Y2", "X0", "Y0", "X2"];
var x0Rotate = ["x0", "y0", "x2", "y2", "x0", "y0", "x2", "y2"];
var x1Rotate = ["x1", "y1", "X1", "Y1", "x1", "y1", "X1", "Y1"];
var x2Rotate = ["x2", "y2", "x0", "y0", "x2", "y2", "x0", "y0"];
var z2Rotate = ["z0", "z0", "z0", "z0", "z2", "z2", "z2", "z2"];
var z1Rotate = ["Z1", "Z1", "Z1", "Z1", "z1", "z1", "z1", "z1"];
var z0Rotate = ["z2", "z2", "z2", "z2", "z0", "z0", "z0", "z0"];
var y0Rotate = ["y2", "x0", "y0", "x2", "y0", "x2", "y2", "x0"];
var y1Rotate = ["Y1", "x1", "y1", "X1", "y1", "X1", "Y1", "x1"];
var y2Rotate = ["y0", "x2", "y2", "x0", "y2", "x0", "y0", "x2"];

var textFile = null,
  makeText = function(t) {
    var text = new Blob([t], {
      type: 'text/plain'
    });
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(text);
    return textFile;
  };


var colorBuf;
window.onload = function init() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log("This is working");
  } else {
    console.log("Not all the file APIs are supported!");
  }
  canvas = document.getElementById("RubikGame");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    console.log('WebGL not supported w/o falling back on experimental-WebGL');
    gl = canvas.getContext('experimental-webgl');
  }
  if (!gl) {
    alert('Your browser does not support WebGL');
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  var elemBuf = gl.createBuffer();
  colorBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuf);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
  vertColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vertColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertColor);
  var vertBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  var vertPos = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vertPos, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertPos);
  pMat = gl.getUniformLocation(program, "projectionMatrix");
  mvMat = gl.getUniformLocation(program, "modelViewMatrix");
  initPosition();
  var mouseChange = false;
  var prevX, prevY;

  var downMouse = function(arg) {
    if (event.which == 1) {
      mouseChange = true;
      prevX = arg.pageX;
      prevY = arg.pageY;
      arg.preventDefault();
      return false;
    }
  };

  var moveMouse = function(arg) {
    if (event.which == 1) {
      if (!mouseChange) {
        return false;
      }
      var delX = arg.pageX - prevX;
      var delY = arg.pageY - prevY;

      var theta2 = Math.abs((angles[1] / Math.PI * 180.0) % 360);

      if (theta2 > 180.0 && theta2 < 270.0 || angles[1] < 0.0) {
        if ((angles[1] / Math.PI * 180.0) % 360 < -180.0) {
          up = vec3(0.0, 1.0, 0.0);
          angles[0] = angles[0] + -delX * 2 * Math.PI / canvas.width;
        } else {
          up = vec3(0.0, -1.0, 0.0);
          angles[0] = angles[0] + delX * 2 * Math.PI / canvas.width;
        }
      } else {
        if (theta2 > 270.0) {
          up = vec3(0.0, -1.0, 0.0);
          angles[0] = angles[0] + delX * 2 * Math.PI / canvas.width;
        } else {
          up = vec3(0.0, 1.0, 0.0);
          angles[0] = angles[0] + -delX * 2 * Math.PI / canvas.width;
        }
      }
      angles[1] = angles[1] + -delY * 2 * Math.PI / canvas.height;
      prevX = arg.pageX;
      prevY = arg.pageY;
      arg.preventDefault();
    }
  };
  var upMouse = function(arg) {
    if (event.which == 3) {
      mouseChange = false;
    }
  };
  canvas.addEventListener("mousedown", downMouse);
  canvas.addEventListener("mouseup", upMouse);
  canvas.addEventListener("mouseout", upMouse);
  canvas.addEventListener("mousemove", moveMouse);

  document.getElementById("X0Btn").onclick = function() {
    randflag = 0;
    var j = 0;
    if (event.shiftKey) {
      j = 1;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("X1Btn").onclick = function() {
    randflag = 0;
    var j = 0;
    if (event.shiftKey) {
      j = 1;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("X2Btn").onclick = function() {
    randflag = 0;
    var j = 1;
    if (event.shiftKey) {
      j = 0;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("Z0Btn").onclick = function() {
    randflag = 0;
    var j = 1;
    if (event.shiftKey) {
      j = 0;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("Z1Btn").onclick = function() {
    randflag = 0;
    var j = 1;
    if (event.shiftKey) {
      j = 0;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("Z2Btn").onclick = function() {
    randflag = 0;
    var j = 0;
    if (event.shiftKey) {
      j = 1;
    }
    animationQueue.push(correctFace(this.value, j));
  };

  document.getElementById("Y0Btn").onclick = function() {
    randflag = 0;
    var j = 0;
    if (event.shiftKey) {
      j = 1;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("Y1Btn").onclick = function() {
    randflag = 0;
    var j = 0;
    if (event.shiftKey) {
      j = 1;
    }
    animationQueue.push(correctFace(this.value, j));
  };
  document.getElementById("Y2Btn").onclick = function() {
    randflag = 0;
    j = 1;
    if (event.shiftKey) {
      j = 0;
    }
    animationQueue.push(correctFace(this.value, j));
  };

  document.getElementById("loadBtn").onclick = function() {
    animationQueue.push(correctFace(this.value));
  };
  document.getElementById("saveBtn").onclick = function() {
    animationQueue.push(correctFace(this.value));
  };
  document.getElementById("rdmBtn").onclick = function() {
    var turns = document.getElementById("inputVal").value;
    if (isNaN(turns) || !turns || turns > 9999 || turns < 0) {
      alert("Please enter a valid value.");
    } else if (animationQueue.length != 0) {
      alert("There are already moves in the animation queue!");
    } else {
      for (i = 0; i < turns; i++) {
        randflag = 1;
        animationQueue.push(correctFace(moves[Math.floor(Math.random() * 9)], Math.floor(Math.random() * 2)));
      }
    }
  };

  document.getElementById("loadBtn").onclick = function() {
    if (!LOADED) {
      alert("Error: No specified file!");
    } else {
      cubePos = CONTENT.slice();
    }
  };
  document.getElementById("saveBtn").onclick = function() {
    var link = document.getElementById("downloadlink");
    link.href = makeText(JSON.stringify(cubePos));
    link.innerHTML = "Download Here!";
  };

  render();
}
var moves = [
  "X0", "X1", "X2", "Z0", "Z1", "Z2", "Y0", "Y1", "Y2"
];

function initPosition() {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      for (k = 0; k < 3; k++) {
        cubePos[i][j][k][0] = i - 1;
        cubePos[i][j][k][1] = j - 1;
        cubePos[i][j][k][2] = k - 1;
        cubePos[i][j][k][3] = [vec3(-1, 0, 0), vec3(0, -1, 0), vec3(0, 0, -1)];
        cubePos[i][j][k][4] = mat4();
      }
    }
  }
}

function getRotationAxis(x, y, z) {
  return cubePos[x + 1][y + 1][z + 1][3];
}

function getRotationMatrix(x, y, z) {
  return cubePos[x + 1][y + 1][z + 1][4];
}

function setRotationMatrix(x, y, z, m) {
  cubePos[x + 1][y + 1][z + 1][4] = m;
}

function colorDisplay(x, y, z) {
  var turnBlack = vec4(0.0, 0.0, 0.0, 1.0);
  for (var i = 0; i < vertexColors.length; i++) {
    vertexColors[i] = COLORS[i];
  }
  if (x != -1) {
    for (var i = 8; i < 12; i++) {
      vertexColors[i] = turnBlack;
    }
  }
  if (x != 1) {
    for (var i = 12; i < 16; i++) {
      vertexColors[i] = turnBlack;
    }
  }
  if (y != -1) {
    for (var i = 16; i < 20; i++) {
      vertexColors[i] = turnBlack;
    }
  }
  if (y != 1) {
    for (var i = 20; i < 24; i++) {
      vertexColors[i] = turnBlack;
    }
  }
  if (z != -1) {
    for (var i = 0; i < 4; i++) {
      vertexColors[i] = turnBlack;
    }
  }
  if (z != 1) {
    for (var i = 4; i < 8; i++) {
      vertexColors[i] = turnBlack;
    }
  }
}

function theta() {
  var theta = (angles[0] / Math.PI * 180.0) % 360;
  var theta2 = (angles[1] / Math.PI * 180.0) % 360;

  var i = 4;
  if ((theta2 >= -180 && theta2 < 0) || (theta2 >= 180 && theta2 < 360)) {
    i = 0;
  }
  if (theta < -315 || (theta >= -45 && theta < 45) || theta >= 315) {
    i += 0;
  } else if ((theta >= -315 && theta < -225) || (theta >= 45 && theta < 135)) {
    i += 1;
  } else if ((theta >= -225 && theta < -135) || (theta >= 135 && theta < 225)) {
    i += 2;
  } else if ((theta >= -135 && theta < -45) || (theta >= 215 && theta < 315)) {
    i += 3;
  }
  console.log(theta, theta2, i);
  return i;
}

function correctFace(side, wise) {
  var newFace;
  var i = theta();
  if (wise) {
    switch (side) {
      case "X0":
        newFace = X0Rotate[i];;
        break;
      case "X1":
        newFace = X1Rotate[i];;
        break;
      case "X2":
        newFace = X2Rotate[i];;
        break;
      case "Z2":
        newFace = Z2Rotate[i];;
        break;
      case "Z0":
        newFace = Z0Rotate[i];;
        break;
      case "Z1":
        newFace = Z1Rotate[i];;
        break;
      case "Y0":
        newFace = Y0Rotate[i];;
        break;
      case "Y2":
        newFace = Y2Rotate[i];;
        break;
      case "Y1":
        newFace = Y1Rotate[i];;
        break;
    }
  }
  if (!wise) {
    switch (side) {
      case "X0":
        newFace = x0Rotate[i];;
        break;
      case "X1":
        newFace = x1Rotate[i];;
        break;
      case "X2":
        newFace = x2Rotate[i];;
        break;
      case "Z2":
        newFace = z2Rotate[i];;
        break;
      case "Z0":
        newFace = z0Rotate[i];;
        break;
      case "Z1":
        newFace = z1Rotate[i];;
        break;
      case "Y0":
        newFace = y0Rotate[i];;
        break;
      case "Y2":
        newFace = y2Rotate[i];;
        break;
      case "Y1":
        newFace = y1Rotate[i];;
        break;
    }
  }
  return newFace;
}

var pMat;
var mvMat;

function render() {

  if (animationQueue.length != 0 && !isAnimating) {
    animQ = animationQueue.shift();
    interval = setInterval(
      function() {
        rotation(animQ)
      }, 1); //Animation timer = 1ms
    isAnimating = true;
  }
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var eye = vec3(20.0 * Math.sin(angles[1]) * Math.sin(angles[0]), //Camera Radius = 20.0
    20.0 * Math.cos(angles[1]), 20.0 * Math.sin(angles[1]) * Math.cos(angles[0]));

  var projMatrix = perspective(45.0, 1.0, 0.35, 1000);
  var mvMatrix = lookAt(eye, at, up);
  var x, y, z, a, b, c;
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      for (z = 0; z < 3; z++) {
        if (x != 1 || y != 1 || z != 1) {
          a = x - 1;
          b = y - 1;
          c = z - 1;
          var tempVar = mvMatrix;
          mvMatrix = mult(mvMatrix, getRotationMatrix(a, b, c));
          mvMatrix = mult(mvMatrix, translate(vec3(a * 2.1, b * 2.1, c * 2.1)));
          colorDisplay(a, b, c);
          colorBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf);
          gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
          vertColor = gl.getAttribLocation(program, "vColor");
          gl.vertexAttribPointer(vertColor, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(vertColor);
          gl.uniformMatrix4fv(pMat, false, flatten(projMatrix));
          gl.uniformMatrix4fv(mvMat, false, flatten(mvMatrix));
          gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
          mvMatrix = tempVar;
        }
      }
    }
  }
  requestAnimFrame(render);
}