PB_DIR="../fayment-service/fayment-grpc/src/main/proto"
OUT_DIR="src/proto"

rm -rf $OUT_DIR
mkdir -p $OUT_DIR

protoc -I $PB_DIR \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$OUT_DIR \
    --js_out=import_style=commonjs,binary:$OUT_DIR \
    $PB_DIR/*.proto

find $OUT_DIR |grep "\.js$" |xargs -n1 sed -i "" "1s/^/\/* eslint-disable *\/`echo ' '`/"
