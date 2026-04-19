# 🎷 Dedo de Saxofonista Alto

Aplicativo web progressivo (PWA) para visualização e reprodução de partituras musicais para **Saxofone Alto**. Exibe o diagrama de dedilhado do saxofone em tempo real enquanto a partitura é tocada, permitindo o estudo e a prática do instrumento diretamente no navegador.

## Funcionalidades

- **Visualização de partituras** em formato MusicXML (`.xml`) e Finale (`.mus`), renderizadas com [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/)
- **Reprodução de áudio** com controle de andamento (BPM) usando SoundFont e WebAudioFont
- **Diagrama de dedilhado** do saxofone alto atualizado em tempo real durante a reprodução
- **Metrônomo** integrado
- **Controle de compasso** para definir o intervalo de repetição da prática
- **Modo Solo**: destaca a voz/instrumento solista
- **Modo Foco**: exibe apenas a partitura, sem distrações
- **Tema claro / escuro**
- **Atraso Bluetooth**: compensação de latência para fones de ouvido sem fio
- **Suporte offline** via Service Worker (PWA instalável)
- **Responsivo**: funciona em desktop e dispositivos móveis

## Partituras incluídas

O repositório contém mais de **400 partituras** numeradas para Saxofone Alto (pasta `Sax-alto/`), incluindo hinos, músicas litúrgicas e peças diversas. Algumas músicas possuem variações (1ª e 2ª partes, versão facilitada, versão harmônica etc.).

## Como usar

### Online
Acesse o aplicativo diretamente pelo navegador (GitHub Pages ou servidor web de sua preferência).

### Localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/GlauberLASantiago/dedo-de-saxofonista-alto.git
   ```
2. Sirva os arquivos com qualquer servidor HTTP local. Exemplo com Python:
   ```bash
   cd dedo-de-saxofonista-alto
   python -m http.server 8080
   ```
3. Abra `http://localhost:8080` no navegador.

> **Nota:** O aplicativo requer um servidor HTTP para funcionar corretamente (não abre diretamente como arquivo `file://` por causa do Service Worker e do carregamento dos XMLs).

### Instalação como PWA
No navegador (Chrome/Edge/Safari), clique em **"Instalar aplicativo"** na barra de endereços para adicionar o app à tela inicial do seu dispositivo e usá-lo offline.

## Tecnologias utilizadas

| Biblioteca | Finalidade |
|---|---|
| [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/) | Renderização de partituras MusicXML |
| [SoundFont Player](https://github.com/danigb/soundfont-player) | Reprodução de áudio via SoundFont |
| [WebAudioFont](https://surikov.github.io/webaudiofont/) | Banco de sons para reprodução |
| [JSZip](https://stuk.github.io/jszip/) | Leitura de arquivos compactados |
| Service Worker (nativo) | Cache e suporte offline (PWA) |

## Estrutura do projeto

```
.
├── index.html          # Aplicação principal (HTML + CSS + JS em arquivo único)
├── manifest.json       # Manifesto PWA
├── sw.js               # Service Worker para suporte offline
├── icons/              # Ícones do aplicativo (192x192 e 512x512)
└── Sax-alto/           # Partituras em formato MusicXML e Finale
```

## Licença

Este projeto é de uso pessoal e educacional. As partituras musicais são de responsabilidade do autor do repositório.
