import { FileEmisor } from '../impl/emisor';


const emisor = new FileEmisor();

emisor.openModule();

emisor.openFunction("add");

emisor.declareParameter("a", 'i32');
emisor.declareParameter("b", 'i32');


emisor.declareResult('i32');

emisor.writeInstruction('get_local', '$a')
emisor.writeInstruction('get_local', '$b')
emisor.writeInstruction('i32.add')

emisor.closeFunction()


emisor.openFunction("add");

emisor.declareParameter("a", 'i32');
emisor.declareParameter("b", 'i32');


emisor.declareResult('i32');

emisor.writeInstruction('get_local', '$a')
emisor.writeInstruction('get_local', '$b')
emisor.writeInstruction('i32.add')

emisor.closeFunction()

emisor.writeExportFunction("add")

emisor.closeModule()