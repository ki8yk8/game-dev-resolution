import Canvas from "@/ui/canvas";
import GameState from "./game/state";

import { getDistricts } from "./game/districts";

import "remixicon/fonts/remixicon.css";
import "./style.css";

// creating the game districts
const districts = getDistricts();

// intializing the canvas
const canvas = new Canvas();

// global game management
const gameState = new GameState(canvas, districts);

// start the game
gameState.start()