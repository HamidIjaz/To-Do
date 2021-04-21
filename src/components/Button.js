import PropTypes from 'prop-types'


const Button = ({color,text,onClick}) => {
    return (
        <div>
            <button onClick={onClick} className='btn' style={{backgroundColor: color}}>{text}</button>
            
        </div>
    )
}

Button.defaultProps={
    color:'blue'
}

Button.protoType ={
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button
