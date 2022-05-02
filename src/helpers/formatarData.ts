export const formatarDataThumbnail = (dataString: string) => {
  const data = new Date(Date.parse(dataString));
  return data.toLocaleDateString('pt-BR');
}