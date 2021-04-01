import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";


//import css
import './map.css'

//import bootstrap
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

//import global do logo
import logo from "../../assets/logo.png";
import logo_cut from "../../assets/logo_cut.png";

//centro do mapa quando o mapa faz load
const center = {
  lat: 39.23,
  lng: -8.68,
};

//tamanho e style do map
// width: "100vw",
//   height: "100vh"
//   ^ isto é mais correto porque nao esconde o zoom in e o zoom out do mapa mas depois fica com scroll. dar fix mais tarde
const containerStyle = {
  width: "100vmax",
  height: "100vmax",
};

const options = {
  disableDefaultUI: false,
};

//?nao faz nada mas acho que é para carregar da bd tambem (?? talvez)
const libraries = ["places"];

const Map = () => {
  // state que controla os marcadores
  // aqui se calhar vai ser carregado da base de dados
  const [markers, setMarkers] = useState([
    {
      id: 0,
      lat: 39.23265937384665,
      lng: -9.084434204101552,
      desc: "Marker 1",
    },
    {
      id: 1,
      lat: 39.176259071456194,
      lng: -8.765144042968739,
      desc: "Marker 2",
    },
    {
      id: 2,
      lat: 39.176259071456194,
      lng: -8.105141442968739,
      desc: "Marker 3",
    },
    {
      id: 3,
      lat: 39.176259071456194,
      lng: -8.565144242968739,
      desc: "Marker 4",
    },
  ]);

  const onMapClick = useCallback((e) => {
    const newMarker = {
      id: markers.length + 1,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkers([...markers, newMarker]);
  }, []);

  const [selectedMarker, setselectedMarker] = useState(null);

  //api key aqui
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBOxAahL77d5AtjV-Ijxf7p8jmff6MMGMA",
    libraries,
  });

  // se isLoaded é true mete o component to googleMaps, se não escreve Loading Maps
  //onde é que tens a className logo? é da api? @rodrigo
  return isLoaded ? (
    <div>
      {/* para a side bar ?<div className="titulo-caixa">
      <img src={logo} alt="" />
      </div> */}
      {/* navbar --------- */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
      <span className="circulo-branco"><img
        alt=""
        src={logo_cut}
        width="30"
        height="30"
        className="d-inline-block align-top"
      /></span>{' '}
      Fundação Luiza Andaluz
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <NavDropdown title="A fundação" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">A intituição</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Visão</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Valores</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Missão</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.5">Organograma</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.6">Plano atividades</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.6">Galeria</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#link">Quer ajudar?</Nav.Link>
      <Nav.Link href="#link">Presidente</Nav.Link>
       </Nav>
       {/* talvez adicionar um icone de um telefone ou voltar a por a esquerda porque a direita ta muito a parte */}
      <Nav className="justify-content-end">
      <Nav.Link  href="#link">Contactos</Nav.Link>
      </Nav>
   
    
  </Navbar.Collapse>
  </Navbar>


      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          //aqui faz o render dos marcadores anteriores e os que sejam a clicar
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            //passa o objeto marker para o state dos markers
            onClick={() => {
              setselectedMarker(marker);
            }}

            //icon do marker pode ser mudado : icon = {}
          ></Marker>
        ))}
        {selectedMarker && (
          //Info aqui. O 0.045 é para fazer com que a window fiquem em cima do marker.
          // LOREM IPSUM LOGO AQUI LETS GOOOOOOOOOOOO
          <InfoWindow
            onCloseClick={() => {
              setselectedMarker(null);
            }}
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
          >
            <div>
              {/*O state do selected markers tem toda a informaçao do marker por isso é so meter*/}

              <h1>{selectedMarker.desc}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <img src={logo} alt="" alignItems="center" />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : loadError ? (
    <div>error</div>
  ) : (
    <div>Loading Maps...</div>
  );
};

export default Map;
