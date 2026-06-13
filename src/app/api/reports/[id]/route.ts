import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/reports/[id] - Get a single accident report
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const report = await db.accidentReport.findUnique({
      where: { id },
    });
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}

// PUT /api/reports/[id] - Update an accident report
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const report = await db.accidentReport.update({
      where: { id },
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
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}

// DELETE /api/reports/[id] - Delete an accident report
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.accidentReport.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 });
  }
}
