import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Mock AudioContext class
class AudioContext {
  createScriptProcessor = () => ({
    connect: () => null,
  });
}

global.window.AudioContext = AudioContext;
