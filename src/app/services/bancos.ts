
export interface banBifFlujo {
	cuota: number,
	sp: number,
	amortizacion: number,
	interes: number,
	desgravamen: number,
	todoRiesgo: number,
	comision: number,
	totalCuota: number,
}


export function calcularFlujoBanBif(montoTotal: number, montoFinaciar: number, meses: number) {
	const TEA = 0.13;
	const SD = 0.00056;
	const STR = 0.00031;
	const PV = 30;
	const IM = Math.pow(1 + TEA, PV / 360) - 1;
	const SDm = (IM + 1) * (1 + SD) - 1;
	const STRg = montoTotal * STR;
	const F = ((Math.pow(1 + SDm, meses)) * SDm * 1) / ((Math.pow(1 + SDm, meses)) - 1);
	const CF = F * montoFinaciar;
	const CT = CF + STRg + 9;

    console.log(STRg);
    console.log(F);
    console.log(CF);
    console.log(CT);


	var datos = []

	var datoInicial: banBifFlujo = {
		cuota: 1,
		sp: montoFinaciar,
		amortizacion: CT - (montoFinaciar * IM) - (montoFinaciar * SD) - STRg - 9,
		interes: montoFinaciar * IM,
		desgravamen: montoFinaciar * SD,
		todoRiesgo: STRg,
		comision: 9,
		totalCuota: CT,
	}
	datos.push(datoInicial);

	for (let i = 2; i <= meses; i++) {
		var _sp = datos[i - 2].sp - datos[i - 2].amortizacion;

		var dato: banBifFlujo = {
			cuota: i,
			sp: _sp,
			amortizacion: CT - (_sp * IM) - (_sp * SD) - STRg - 9,
			interes: _sp * IM,
			desgravamen: _sp * SD,
			todoRiesgo: STRg,
			comision: 9,
			totalCuota: CT,
		}

		datos.push(dato);
	}
    return datos;	
}

function calcularFlujo(montoFinaciar: number, TEA: number, SD: number, SI: number, importe: number, meses: number) {

	const dias = 30;
	const TID = Math.pow(1 + TEA, 1 / 360) - 1;
	const TIM = Math.pow(1 + TID, dias) - 1;
	const IM = montoFinaciar * TIM;
	const SDm = montoFinaciar * (SD * (dias / 30));
	const SIm = importe * (SI / 12);
	const cuotaMensual = montoFinaciar * (TIM / (1 - Math.pow(1 + TIM, -meses)));

	var datos = []

	var _interesTotal = IM + SDm + SIm;

	var datoInicial: bancoDaniel = {
		periodo: 1,
		amortizacion: (cuotaMensual - IM).toFixed(2),
		IT: _interesTotal.toFixed(2),
		interes: IM.toFixed(2),
		SD: SDm.toFixed(2),
		SI: SIm.toFixed(2),
		cuota: cuotaMensual.toFixed(2),
		_saldo: montoFinaciar - (cuotaMensual - IM),
	}
	datos.push(datoInicial);
		
	for (let i = 1; i < meses ; i++) { 

		var _interes = datos[i - 1]._saldo * (Math.pow(1 + TEA, 30 / 360) - 1);
		var _interesTotal = _interes + SDm + SIm;
		var _amortizacion = cuotaMensual - _interes;
		var dato: bancoDaniel = {
			periodo: i + 1,
			amortizacion: _amortizacion.toFixed(2),
			IT: _interesTotal.toFixed(2),
			interes: _interes.toFixed(2),
			SD: SDm.toFixed(2),
			SI: SIm.toFixed(2),
			cuota: cuotaMensual.toFixed(2),
			_saldo: datos[i - 1]._saldo - _amortizacion,
		}
		datos.push(dato);
	}
	return datos;
}

export interface bancoDaniel{
	periodo: number,
	amortizacion: string,
	IT: string,
	interes: string,
	SD: string,
	SI: string,
	cuota: string,
	_saldo: number,
}

export function calcularFlujoBCP(montoFinaciar: number, importe: number, meses: number) {
	var TEA = 0.1399;
	var SD = 0.00044;
	var SI = 0.00026;

	return calcularFlujo(montoFinaciar, TEA, SD, SI, importe, meses);
}


export function calcularFlujoIntebank(montoFinaciar: number, importe: number, meses: number) {
	var TEA = 0.105;
	var SD = 0.00028;
	var SI = 0.003;

	return calcularFlujo(montoFinaciar, TEA, SD, SI, importe, meses);
}

export function exportToCSV(data: any[], filename: string): void {
  const csv: string = data.map((row: any) => row.join(',')).join('\n');
  const blob: Blob = new Blob([csv], { type: 'text/csv' });
  const url: string = URL.createObjectURL(blob);

  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Simulate a click event to trigger the download
  a.dispatchEvent(new MouseEvent('click'));

  // Cleanup
  URL.revokeObjectURL(url);
}