import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import * as formulajs from '@formulajs/formulajs' // import entire package
import { calcularFlujoIntebank, calcularFlujoBCP, bancoDaniel, banBifFlujo, calcularFlujoBanBif, exportToCSV } from 'src/app/services/bancos';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  dataForm!: UntypedFormGroup;
	obj: any;
	min = 60;
	max = 300;
	datosInterbank: bancoDaniel[] = [];
	datosBCP: bancoDaniel[] = [];
	datosBanBif: banBifFlujo[] = [];

	bancoActual = "";

	_disabled = true;
	number: number = 0;
	monedas: any[] = [
		{ label: 'Soles', value: 'Soles' },
		{ label: 'Dolares', value: 'Dolares' },
	]
	bancos: any[] = [
		{ label: 'Interbank', value: 'INTBK' },
		{ label: 'BCP', value: 'BCP' },
		{ label: 'BanBif', value: 'BBF' },
	]
	constructor(
		private formBuilder: UntypedFormBuilder,
		private router: Router
		) { }

	ngOnInit(): void {
		this.obj = JSON.parse(localStorage.getItem('user') || '{}');
		this.dataForm = this.formBuilder.group({
      moneda: ['', { validators: [Validators.required],updateOn: 'change'}],
      valorVivienda: ['200000', { validators: [Validators.required],updateOn: 'change'}],
      boolApoyo: ['', { validators: [Validators.required],updateOn: 'change'}],
			cuotaInicial: ['30000', { validators: [Validators.required], updateOn: 'change' }],
			porcentajeCuotaInicial: ['', { validators: [Validators.required], updateOn: 'change' }],
      bonoBuenPagador: ['', { validators: [Validators.required],updateOn: 'change'}],
      boolSostenible: ['true', { validators: [Validators.required],updateOn: 'change'}],
      BBP: ['', { validators: [Validators.required],updateOn: 'change'}],
      montoFinanciar: ['', { validators: [Validators.required],updateOn: 'change'}],
      TEA: ['', { validators: [Validators.required],updateOn: 'change'}],
      seguroDesgravamen: ['', { validators: [Validators.required],updateOn: 'change'}],
      seguroInmueble: ['', { validators: [Validators.required],updateOn: 'change'}],
      plazoMeses: ['12', { validators: [Validators.required],updateOn: 'change'}],
      TCEA: ['', { validators: [Validators.required],updateOn: 'change'}],
      cuotaMensual: ['', { validators: [Validators.required],updateOn: 'change'}],
      costoSeguroInmueble: ['', { validators: [Validators.required],updateOn: 'change'}],
      banco: ['', { validators: [Validators.required],updateOn: 'change'}],
		});
		
		this.dataForm.get('valorVivienda')?.valueChanges.subscribe(() => {
			this.updatePorcentajeCuotaInicial();
			this.updateBBP();
    });

    this.dataForm.get('cuotaInicial')?.valueChanges.subscribe(() => {
      this.updatePorcentajeCuotaInicial();
		});
		
		this.dataForm.get('boolApoyo')?.valueChanges.subscribe(() => {
      this.updateApoyo();
		});

		this.dataForm.get('boolSostenible')?.valueChanges.subscribe(() => {
      this.updateTotalBBP();
		});
		this.dataForm.get('banco')?.valueChanges.subscribe(() => {
      this.bancoActual = this.dataForm.get('banco')?.value.value;
		});
	}
	
	updatePorcentajeCuotaInicial() {
    const valorVivienda = this.dataForm.get('valorVivienda')?.value;
    const cuotaInicial = this.dataForm.get('cuotaInicial')?.value;

    if (valorVivienda && cuotaInicial) {
      const porcentaje = (cuotaInicial / valorVivienda) * 100;
			const formattedPorcentaje = porcentaje.toFixed(3);
			this.dataForm.get('porcentajeCuotaInicial')?.setValue(formattedPorcentaje);
    } else {
      this.dataForm.get('porcentajeCuotaInicial')?.setValue(null);
    }
	}
	
	updateBBP() { 
		const valorVivienda = this.dataForm.get('valorVivienda')?.value;
		var _bbp = 0;
		if (valorVivienda < 65200) {
			alert("El valor de la vivienda debe ser mayor a 65.200");
		} else if (65200 < valorVivienda && valorVivienda < 93100) {
			_bbp = 25700;
		} else if (93100 < valorVivienda && valorVivienda < 139400) {
			_bbp = 21400;
		} else if (139400 < valorVivienda && valorVivienda < 232200) {
			_bbp = 19600;
		} else if (232200 < valorVivienda && valorVivienda < 343900) {
			_bbp = 10800;
		}
		this.dataForm.get('bonoBuenPagador')?.setValue(_bbp);
		this.dataForm.get('BBP')?.setValue(_bbp);
	}

	updateApoyo() {
		if (this.dataForm.get('boolApoyo')?.value == true) {
			this.dataForm.get('bonoBuenPagador')?.setValue(0);
			this.dataForm.get('BBP')?.setValue(0);
		}
		else {
			this.updateBBP();
			this.updateTotalBBP();
		}
	}

	updateTotalBBP() { 
		const valorVivienda = this.dataForm.get('valorVivienda')?.value;
		const _boolSostenible = this.dataForm.get('boolSostenible')?.value;
		const _bonoBuenPagador = this.dataForm.get('bonoBuenPagador')?.value;
		const _cuotaInicial = this.dataForm.get('cuotaInicial')?.value;
		var _totalbbp = _bonoBuenPagador;
		if (_boolSostenible == true) {
			if (valorVivienda < 65200) {
				alert("El valor de la vivienda debe ser mayor a 65.200");
			} else if (65200 < valorVivienda && valorVivienda < 93100) {
				_totalbbp = 31100;
			} else if (93100 < valorVivienda && valorVivienda < 139400) {
				_totalbbp = 26800;
			} else if (139400 < valorVivienda && valorVivienda < 232200) {
				_totalbbp = 25000;
			} else if (232200 < valorVivienda && valorVivienda < 343900) {
				_totalbbp = 16200;
			}
		}
		this.dataForm.get('BBP')?.setValue(_totalbbp);
		const monto = valorVivienda - _cuotaInicial - _totalbbp;
		this.dataForm.get('montoFinanciar')?.setValue(monto);
	}

	onSubmit() { }


	calcularPago(tasa: number, nper: number, pv: number): number {
		// Calcular el pago periódico
		const pago = pv * tasa / (1 - Math.pow(1 + tasa, -nper));
	
		return pago;
	}

	calcularMontoFinanciar() {
		const valorVivienda = this.dataForm.get('valorVivienda')?.value;
		const _cuotaInicial = this.dataForm.get('cuotaInicial')?.value;
		const _totalbbp = this.dataForm.get('BBP')?.value;
		const _montoFinanciar = this.dataForm.get('montoFinanciar')?.value;
		const _meses = this.dataForm.get('plazoMeses')?.value;
		const monto = valorVivienda - _cuotaInicial - _totalbbp;
		this.dataForm.get('montoFinanciar')?.setValue(monto);

		this.datosInterbank = calcularFlujoIntebank(_montoFinanciar, valorVivienda, _meses);
		this.datosBCP = calcularFlujoBCP(_montoFinanciar, valorVivienda, _meses);
		this.datosBanBif = calcularFlujoBanBif(valorVivienda, _montoFinanciar, _meses);

	}
	
	calcularFinal() { 
		const _TEA = this.dataForm.get('TEA')?.value;
		const _seguro = this.dataForm.get('seguroDesgravamen')?.value;
		const _plazo = this.dataForm.get('plazoMeses')?.value;
		const _montoFinanciar = this.dataForm.get('montoFinanciar')?.value;
		const TEM = (Math.pow(1 + (_TEA/100), 30 / 360) - 1);

		console.log(TEM, _seguro, _plazo, _montoFinanciar)
		var costoMensual = this.calcularPago(TEM + (_seguro / 100), _plazo, _montoFinanciar);
		this.dataForm.get('cuotaMensual')?.setValue(costoMensual + this.calcularCostoSeguroInmueble());
		var _TCEM = formulajs.RATE(_plazo, costoMensual + this.calcularCostoSeguroInmueble(), -1 * _montoFinanciar, 0.1, 0, 0) * 100;
		console.log(_TCEM);
		const _TCEA = Math.pow(1 + (_TCEM/100), 360 / 30) - 1;
		this.dataForm.get('TCEA')?.setValue(_TCEA * 100);
	}

	calcularCostoSeguroInmueble() {
		const _seguro = this.dataForm.get('seguroInmueble')?.value;
		const _vivienda = this.dataForm.get('valorVivienda')?.value;

		const result = (_seguro / 100) * _vivienda / 12;
		this.dataForm.get('costoSeguroInmueble')?.setValue(result);
		return result;
	}

	export() {

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.datosBanBif, {dateNF: 'dd/MM/yyyy HH:mm:ss'});
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "flujo");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
