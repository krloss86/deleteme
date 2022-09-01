import React from 'react';
import Marquee from 'react-fast-marquee';
import './index.scss';

function Anuncios() {
  var anunciosBcra = ['#ComafiTips. Por favor, para depósitos, pagos y/o extracciones, te recomendamos dirigirte a las Terminales de Autoservicio y/o Cajeros Automáticos. Por cualquier otra operación te sugerimos utilizar nuestro homebanking / mobile banking. Hoy más que nunca, Si te va bien, nos va bien.'];
  var carteleraBcra = [];

  for (let anuncio of anunciosBcra) {
    carteleraBcra.push('<p key="'+anuncio+'">'+anuncio+'</p>');
  }

  return 
    '<div className="bannerBcraWrapper">'+
      '<div class="anunciosBcraWrapper">'+
        <Marquee gradient={false} speed={20}>{carteleraBcra}</Marquee>
      '</div>'+
    '</div>'
  ;
}

export default Anuncios;