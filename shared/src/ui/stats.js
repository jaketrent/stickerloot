import glamorous from 'glamorous'
import React from 'react'

const bgColor = '#1b91ce'

const Stats = glamorous.div({
  display: 'flex',
  position: 'fixed',
  bottom: '50px',
  left: 0,
  width: '100%',
  display: 'flex',
  background: bgColor,
  height: '100px'
})

const Swings = glamorous.div({
  transform: 'scale(1.5) translate(15%, -7%)',
  borderTop: `4px solid ${bgColor}`,
  borderRight: `12px solid ${bgColor}`,
  textAlign: 'center',
  borderRadius: '0 8px 0 0'
})

const SwingsLabel = glamorous.div({
  background: bgColor,
  color: '#fff',
  fontSize: '8px',
  padding: '0 4px 4px 4px'
})

const SwingsCount = glamorous.div({
  padding: '4px 12px 4px 12px',
  fontSize: '3em',
  fontWeight: '800',
  background: '#fff',
  color: bgColor
})

const Stickers = glamorous.div({
  flex: '1',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '24px'
})

const StickerCount = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  border: `8px solid ${bgColor}`,
  color: bgColor,
  padding: '12px 16px',
  fontWeight: '800',
  transform: 'translateY(-4px)',
  borderRadius: '4px'
})

const StickerImg = glamorous.img({
  maxWidth: '100%',
  maxHeight: '60%',
  margin: '0 auto'
})

const Sticker = glamorous.div({
  flex: '1',
  position: 'relative',
  top: '-8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export default props =>
  <div>
    <Stats>
      <Swings>
        <SwingsLabel>Swings Left</SwingsLabel>
        <SwingsCount>{props.swingsRemaining}</SwingsCount>
      </Swings>
      <Stickers>
        {Object.keys(props.stickers || []).map(key =>
          <Sticker key={props.stickers[key].src}>
            <StickerCount>{props.stickers[key].count}</StickerCount>
            <StickerImg src={props.stickers[key].src} />
          </Sticker>
        )}
      </Stickers>
    </Stats>
  </div>
