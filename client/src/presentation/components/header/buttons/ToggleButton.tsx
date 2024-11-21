import './ToggleButton.css';

export const ToggleButton = ({ toggle, setToggle }) => {
  return (
    <div className='app_header-btn-toggle z-10' onClick={() => setToggle(prev => !prev)}>
      <span className={`upper-line-nav ${toggle ? 'upper-animate return-animation' : 'line-navbar'}`}></span>
      <span className={`middle-line-nav ${toggle ? 'middle-animate return-animation' : 'line-navbar'}`}></span>
      <span className={`lower-line-nav ${toggle ? 'lower-animate return-animation' : 'line-navbar'}`}></span>
    </div>
  )
}
