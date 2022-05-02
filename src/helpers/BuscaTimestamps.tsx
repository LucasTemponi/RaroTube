import { useTimestamp } from "../hooks/useTimestamp";

export const BuscaTimestamps = (texto: string) => {
  
  const videoTime = useTimestamp(state => state.setTempo);

  const regex = /((00|[0-9]|1[0-9]|2[0-3]):)?([0-9]|[0-5][0-9]):([0-5][0-9])/g;
  const matches = texto.match(regex);
  if (matches) {
    const tempoString = matches[0].split(':')
    let tempoEmSegundos = 0
    for (let i = 0; i < tempoString.length; i++) {
      tempoEmSegundos += parseInt(tempoString[i]) * Math.pow(60, tempoString.length - i - 1)
    }
    return texto.split(' ').map(part =>
      regex.test(part) ? <button className=' font-semibold text-raro-cobalto ' onClick={() => videoTime(tempoEmSegundos)}>{part}</button> : `${part} `);
  } else {
    return texto
  }
}