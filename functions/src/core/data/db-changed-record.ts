export class DbChangedRecord {

    constructor(
       public readonly code: string,
       public readonly description: string,
       public readonly uid: string,
       public readonly recordId?: string,
       public readonly dateTime?: Date,
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    copyWith(data: Partial<Record<keyof DbChangedRecord, any>>) {
        return new DbChangedRecord(
            data.code ?? this.code,
            data.description ?? this.description,
            data.uid ?? this.uid,
            data.recordId ?? this.recordId,
            data.dateTime ?? this.dateTime,
        );
    }

}
