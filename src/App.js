import React, {useState} from 'react'
import Slider from './Slider'
import SidebarItem from './SidebarItem'

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%"
  },
  {
    name: "Blur",
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px"
  },
  {
    name: "Hue Rotate",
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg"
  },
  {
    name: "Grayscale",
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%"
  },
  {
    name: "Saturation",
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%"
  }
]
export default function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionIndex]


  function handleSliderChange ({ target }){
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if(index !== selectedOptionIndex) return option
        return { ...option, value: target.value}
      }) 
    })
  }

  function getImageStyles () {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return {
      filter: filters.join(' ')
    }
  }

  return (
    <>
      <div className="header">
        <h2>Photo Editor - v0.001</h2>
        <sup>Deveoped by Mahesh Muttinti & powered by React.js</sup>
      </div>
      <div className="container">
        <div className="main-image" style={getImageStyles()} />
        <div className="sidebar">
          {options.map((option, index) => (
            <SidebarItem 
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick = {() => setSelectedOptionIndex(index)}
            />
          ))}
          </div>
        <Slider 
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </>
  );
}
