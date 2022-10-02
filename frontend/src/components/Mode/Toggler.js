import React from 'react'
import { func, string } from 'prop-types';
// import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart as HeartEmpty,
    faSun,
    faMoon,
    faUser,
} from '@fortawesome/free-regular-svg-icons';

const Toggle = ({theme, toggleTheme }) => {
    const isLight = theme === 'light';
    return (
        <Button onClick={toggleTheme} >
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMoon} />
        </Button>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;