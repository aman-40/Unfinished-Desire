import React from 'react';
import './Avatar.css';

export default function Avatar({ image, size=48, online=false, name }){
  const style = { width: size, height: size, borderRadius: size/4 };
  return (
    <div className={`avatar-root ${online ? 'online' : ''}`} style={style}>
      {image ? <img src={image} alt={name || 'avatar'} /> : <div className="initials">{(name||"?").slice(0,2).toUpperCase()}</div>}
    </div>
  )
}
