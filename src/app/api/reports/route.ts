import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/reports - List all accident reports
export async function GET() {
  try {
    const reports = await db.accidentReport.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

// POST /api/reports - Create a new accident report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const report = await db.accidentReport.create({
      data: {
        crimeNo: body.crimeNo,
        section: body.section,
        policeStation: body.policeStation,
        officerName: body.officerName,
        officerAddress: body.officerAddress || null,
        receiptDate: body.receiptDate,
        receiptDetails: body.receiptDetails || null,
        accidentDate: body.accidentDate,
        accidentTime: body.accidentTime,
        accidentPlace: body.accidentPlace,
        roadDescription: body.roadDescription,
        chassisNo: body.chassisNo || null,
        regNo: body.regNo || null,
        vehicleClass: body.vehicleClass || null,
        vehicleMake: body.vehicleMake || null,
        vehicleYear: body.vehicleYear || null,
        inspectionDate: body.inspectionDate,
        inspectionTime: body.inspectionTime,
        inspectionPlace: body.inspectionPlace,
        lastInspectionDate: body.lastInspectionDate || null,
        fitnessCertExpiryDate: body.fitnessCertExpiryDate || null,
        damagesDetails: body.damagesDetails || null,
        footBrakeEfficiency: body.footBrakeEfficiency || null,
        parkingBrakeEfficiency: body.parkingBrakeEfficiency || null,
        brakeEvenAction: body.brakeEvenAction || null,
        hydraulicFluidLeak: body.hydraulicFluidLeak || null,
        hydraulicLeakage: body.hydraulicLeakage || null,
        hydraulicBreakages: body.hydraulicBreakages || null,
        hydraulicWornOut: body.hydraulicWornOut || null,
        hydraulicFailureOther: body.hydraulicFailureOther || null,
        mechanicalLackLubrication: body.mechanicalLackLubrication || null,
        mechanicalSlackAdjustment: body.mechanicalSlackAdjustment || null,
        mechanicalWornOut: body.mechanicalWornOut || null,
        mechanicalFailureOther: body.mechanicalFailureOther || null,
        parkingBrakeLackLubrication: body.parkingBrakeLackLubrication || null,
        parkingBrakeSlackness: body.parkingBrakeSlackness || null,
        parkingBrakeWornOut: body.parkingBrakeWornOut || null,
        parkingBrakeOtherReasons: body.parkingBrakeOtherReasons || null,
        steeringBacklash: body.steeringBacklash || null,
        tyreCondition: body.tyreCondition || null,
        permitValidity: body.permitValidity || null,
        insuranceExpiryDate: body.insuranceExpiryDate || null,
        insuranceCompany: body.insuranceCompany || null,
        insurancePolicyNo: body.insurancePolicyNo || null,
        insuranceCertificate: body.insuranceCertificate || null,
        ownerName: body.ownerName || null,
        ownerAddress: body.ownerAddress || null,
        driverName: body.driverName || null,
        driverAddress: body.driverAddress || null,
        driverLicenceDetails: body.driverLicenceDetails || null,
        driverLicenceNo: body.driverLicenceNo || null,
        driverLicenceValidUpto: body.driverLicenceValidUpto || null,
        involvedPersonDetails: body.involvedPersonDetails || null,
        legalHeirsDetails: body.legalHeirsDetails || null,
        mechanicalDefectsOpinion: body.mechanicalDefectsOpinion || null,
        tradePlateDetails: body.tradePlateDetails || null,
        vcrNo: body.vcrNo || null,
        vcrDate: body.vcrDate || null,
        copyTo: body.copyTo || null,
        inspectorName: body.inspectorName || null,
        inspectorTitle: body.inspectorTitle || null,
        inspectorLocation: body.inspectorLocation || null,
      },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
