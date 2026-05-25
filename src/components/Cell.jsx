function Cell({ value, isSelected, isPeer, isGiven, isError, isMatch, onClick, row, col }) {
  const classes = [
    'cell',
    isSelected ? 'selected' : '',
    isPeer ? 'peer' : '',
    isGiven ? 'given' : '',
    isError ? 'error' : '',
    isMatch && !isSelected ? 'match' : '',
    col === 2 || col === 5 ? 'box-right' : '',
    row === 2 || row === 5 ? 'box-bottom' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} onClick={onClick}>
      {value !== 0 ? value : ''}
    </div>
  )
}

export default Cell