import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Undo, Redo, Trash, Save, Circle, Eraser, ZoomIn, ZoomOut, Minus } from "lucide-react";
import { SketchPicker } from "react-color";
import Konva from "konva";
import { Stage, Layer, Line, Text } from "react-konva";

const Whiteboard = () => {
    const [lines, setLines] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(3);
    const [tool, setTool] = useState("pen");
    const [zoom, setZoom] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);

    const stageRef = useRef(null);

    const handleMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        setIsDrawing(true);
        // Initiate a new line
        setLines([
            ...lines,
            {
                points: [pos.x, pos.y],
                color: tool === "eraser" ? "#FFFFFF" : selectedColor,
                width: brushSize,
            },
        ]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setLines([...lines.slice(0, lines.length - 1), lastLine]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setRedoStack([]);
    };

    const handleUndo = () => {
        if (lines.length > 0) {
            setRedoStack([...redoStack, lines[lines.length - 1]]);
            setLines(lines.slice(0, -1));
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            setLines([...lines, redoStack[redoStack.length - 1]]);
            setRedoStack(redoStack.slice(0, -1));
        }
    };

    const handleClear = () => {
        setLines([]);
        setRedoStack([]);
    };

    const handleSave = () => {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement("a");
        link.href = uri;
        link.download = "whiteboard.png";
        link.click();
    };

    const handleBrushSizeChange = (size) => setBrushSize(size);
    const handleToolChange = (newTool) => setTool(newTool);
    const handleColorChange = (color) => setSelectedColor(color.hex);

    const handleZoomIn = () => setZoom(zoom + 0.1);
    const handleZoomOut = () => setZoom(zoom - 0.1);

    const handlePanMouseDown = (e) => {
        setPanX(e.clientX);
        setPanY(e.clientY);
    };

    const handlePanMouseMove = (e) => {
        if (e.buttons === 1) {
            const dx = e.clientX - panX;
            const dy = e.clientY - panY;
            setPanX(e.clientX);
            setPanY(e.clientY);
            stageRef.current.x(stageRef.current.x() + dx);
            stageRef.current.y(stageRef.current.y() + dy);
        }
    };

    const handlePanMouseUp = () => {};

    useEffect(() => {
        if (stageRef.current) {
            stageRef.current.scale({ x: zoom, y: zoom });
            stageRef.current.batchDraw();
        }
    }, [zoom]);

    return (
        <div className="flex h-screen">
            {/* Left side: Whiteboard */}
            <div className="flex-1 p-4">
                <div className="flex justify-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-700">ThinkEdge Whiteboard</h1>
                </div>

                {/* Toolbar for Undo, Redo, Clear, Save, Zoom */}
                <div className="flex gap-3 mb-4">
                    <Button onClick={handleUndo} disabled={lines.length === 0} className="bg-blue-500 text-white">
                        <Undo /> Undo
                    </Button>
                    <Button onClick={handleRedo} disabled={redoStack.length === 0} className="bg-green-500 text-white">
                        <Redo /> Redo
                    </Button>
                    <Button onClick={handleClear} className="bg-red-500 text-white">
                        <Trash /> Clear
                    </Button>
                    <Button onClick={handleSave} className="bg-yellow-500 text-white">
                        <Save /> Save
                    </Button>
                    <Button onClick={handleZoomIn} className="bg-gray-500 text-white">
                        <ZoomIn />
                    </Button>
                    <Button onClick={handleZoomOut} className="bg-gray-500 text-white">
                        <ZoomOut />
                    </Button>
                </div>

                {/* Brush size and tool selector */}
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={() => handleToolChange("pen")}
                        className={`p-2 rounded-lg ${tool === "pen" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border"}`}
                    >
                        <Circle />
                    </button>
                    <button
                        onClick={() => handleToolChange("eraser")}
                        className={`p-2 rounded-lg ${tool === "eraser" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border"}`}
                    >
                        <Eraser />
                    </button>

                    {[3, 6, 9].map((size) => (
                        <button
                            key={size}
                            onClick={() => handleBrushSizeChange(size)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                brushSize === size ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Minus className={`w-${size} h-${size}`} />
                        </button>
                    ))}
                </div>

                {/* Whiteboard Canvas */}
                <div className="border-2 border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-4xl h-[500px] relative overflow-hidden">
                    <Stage
                        width={window.innerWidth}
                        height={500}
                        ref={stageRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseOut={handleMouseUp}
                        onWheel={(e) => {
                            e.preventDefault();
                            const delta = Math.sign(e.deltaY) * 0.1;
                            setZoom((prevZoom) => Math.max(0.5, Math.min(3, prevZoom - delta)));
                        }}
                        onMouseDownCapture={handlePanMouseDown}
                        onMouseMoveCapture={handlePanMouseMove}
                        onMouseUpCapture={handlePanMouseUp}
                    >
                        <Layer>
                            {/* Render lines */}
                            {lines.map((line, index) => (
                                <Line
                                    key={index}
                                    points={line.points}
                                    stroke={line.color}
                                    strokeWidth={line.width}
                                    lineCap="round"
                                    lineJoin="round"
                                />
                            ))}

                            {/* Add "ThinkEdge" text to whiteboard */}
                            <Text
                                text="ThinkEdge"
                                x={window.innerWidth / 2 - 100} // Adjust position based on center
                                y={50}
                                fontSize={30}
                                fontFamily="Arial"
                                fill="#000000"
                                align="center"
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>

            {/* Right side: Color Palette */}
            <div className="w-64 bg-gray-200 p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Brush Settings</h2>

                {/* Color Picker */}
                <div className="mb-4">
                    <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />
                </div>

                {/* Brush Size */}
                <div className="flex gap-3 mb-4">
                    {[3, 6, 9].map((size) => (
                        <button
                            key={size}
                            onClick={() => handleBrushSizeChange(size)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center $ {
                                brushSize === size ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Minus className={`w-${size} h-${size}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;
