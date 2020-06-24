import React from 'react';
import { Text, Box, Color } from 'ink'
import Spinner from 'ink-spinner';
import { DeployingResourceApplyState, DeployingResource } from "../models/terraform"

interface DeployingElementStatusProps {
  action: DeployingResourceApplyState;
}

export const DeployingElementStatus = ({action}: DeployingElementStatusProps) => {
  let actionSymbol: string;
  let color: string;

  switch(action) {
    case DeployingResourceApplyState.CREATING:
      actionSymbol = '+';
      color = 'green'
      break;
    case DeployingResourceApplyState.CREATED:
      actionSymbol = 'c';
      color = 'green'
      break;
    case DeployingResourceApplyState.UPDATING:
      actionSymbol = '~';
      color = 'yellow'
      break;
    case DeployingResourceApplyState.UPDATED:
      actionSymbol = 'u';
      color = 'yellow'
      break;
    case DeployingResourceApplyState.DESTROYING:
      actionSymbol = '-';
      color = 'red'
      break;
    case DeployingResourceApplyState.DESTROYED:
      actionSymbol = 'd';
      color = 'red'
      break;
    case DeployingResourceApplyState.WAITING:
      actionSymbol = '~';
      color = 'cyan'
      break;
    case DeployingResourceApplyState.SUCCESS:
      actionSymbol = 's';
      color = 'green'
      break;
    case DeployingResourceApplyState.ERROR:
      actionSymbol = 'x';
      color = 'red'
      break;
  }

  const inProgress = [DeployingResourceApplyState.CREATING, DeployingResourceApplyState.UPDATING, DeployingResourceApplyState.DESTROYING].includes(action)

  return(
    <>
      { inProgress ? (<Color keyword={color}><Spinner type="toggle"/></Color>) : (
      <Color keyword={color}><Text>{ actionSymbol }&nbsp;</Text></Color>)}
    </>
  )
}

interface DeployingElementProps {
  resource: DeployingResource;
}


export const DeployingElement = ({resource}: DeployingElementProps) => (
  <Box key={resource.id}>
    <DeployingElementStatus action={resource.applyState}/>
    <Text>{ resource.id }</Text>
  </Box>
)